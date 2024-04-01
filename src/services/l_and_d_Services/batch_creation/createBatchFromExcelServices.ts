import * as XLSX from 'xlsx';
import e, { Request, Response } from 'express';
import getUserByRoleNameServices from './getUserByRoleNameServices';
import createUserServices from './createUserServices';
import findBatchByBatchNameServices from './findBatchByBatchNameServices';
import createTraineeServices from './createTraineeServices';
import createBatchServices from './createBatchServices';
import courseBatchAllocationServices from './courseBatchAllocationServices';
import deleteCreatedBatchByBatchId from './deleteCreatedBatchByBatchId';

//Inputs expected from the Excel sheet
interface ExcelRow {
    Name : string;
    Role : string;
    Email : string;
    Percipio_Email : string;
    Password : string;
}

let batch_id_global : number = 0;
let course_batch_allocation_id_global : number = 0;
let traineesInTheBatchCounter : number = 0;

const createBatchFromExcelServices = async(req : Request, res : Response, inputPath : string, batch_name : string, userID : number, start_date : string, end_date : string, course_collection_name : string) => {

    let courseAllocationCounter = 0;
    // Read the Excel file located at the specified input path
    const batchWorkbook = XLSX.readFile(inputPath);

    // Extract the name of the first sheet in the workbook
    const batchSheetName = batchWorkbook.SheetNames[0];

    // Retrieve the data of the first sheet from the workbook
    const batchSheet = batchWorkbook.Sheets[batchSheetName];

    // Convert the sheet data into JSON format
    const jsonBatchData: ExcelRow[] = XLSX.utils.sheet_to_json<ExcelRow>(batchSheet);

    console.log(jsonBatchData);

    //For each json data (Each row containing each Trainee's details)
    for(const row of jsonBatchData)
    {
        const {Name, Role, Email, Percipio_Email, Password} = row;
        console.log(Name);

        //To check if the role specified in the Excel sheet is Trainee. If yes, find the corresponding role's role id.
        let roleId;
        const findRole = await getUserByRoleNameServices(Role);
        if(findRole)
        {
            roleId = findRole.role_id;
        }
        else
        {
            return {
                status : 404,
                error : 'Invalid Role!'
            }
        }

        //To check if a batch with the specified name already exists!
        const findBatch = await findBatchByBatchNameServices(batch_name);
        console.log("FindBatch = ", findBatch)
        if(findBatch)
        {
            batch_id_global = findBatch.batch_id;
            const userCreation = await createUserServices(Name, Role, Email, Percipio_Email,Password, roleId);
    
            if(!userCreation)
            {
                console.log("----------Skipping User Creation!!---------");
                continue;
            }
            let newUser_id = userCreation.user_id;
            if(newUser_id && findBatch.batch_id)
            {
                const traineeCreation = await createTraineeServices(newUser_id, findBatch.batch_id, userID)
                console.log('Trainee has been added To an Already Existing Batch');
                traineesInTheBatchCounter = traineesInTheBatchCounter + 1;
            }
            else
            {
                return {
                    status : 400,
                    error : 'Could not create Trainee because of Invalid data'
                }
            }
        }
        else
        {
            //Doesnt find any existing batch with the same name and hence creating a new batch.
            //UserID specifies the ID of the employee who has mae the API request and is trying to create the batch
            const batchCreation = await createBatchServices(batch_name, start_date, end_date, userID);  
            if(batchCreation)
            {
                batch_id_global = batchCreation.batch_id;
                if(courseAllocationCounter === 0)
                {
                    const courseBatchAllocation = await courseBatchAllocationServices(batchCreation.batch_id, course_collection_name, userID);
                    course_batch_allocation_id_global = courseBatchAllocation.course_set_id;
                    courseAllocationCounter = courseAllocationCounter + 1;
                }

                const userCreation = await createUserServices(Name, Role, Email, Percipio_Email,Password, roleId);
                if(!userCreation)
                {
                    console.log("----------Skipping User Creation!!---------");
                    continue;
                }
                let newUser_id = userCreation.user_id;
                if(newUser_id && batchCreation.batch_id)
                {
                    const traineeCreation = await createTraineeServices(newUser_id, batchCreation.batch_id, userID);
                    console.log('Batch and Trainee has been created successfully!');
                    traineesInTheBatchCounter = traineesInTheBatchCounter + 1;
                }
                else
                {
                    return {
                        status : 400,
                        error : 'Could not create Trainee because of Invalid data'
                    }
                }
            }
            else
            {
                return {
                    status : 400,
                    error : 'Could not create Batch because of invalid data'
                } 
            }  
        }
    }
    if(traineesInTheBatchCounter === 0)
    {
        const deleteCreatedBatch = await deleteCreatedBatchByBatchId(batch_id_global, course_batch_allocation_id_global);
        return {
            status : 400,
            error : 'Could not create Batch because all of the trainee details Are duplicate'
        } 
    }
    return {
        status : 200,
        message : 'Batch has been Created successfully'
    }
}

export default createBatchFromExcelServices;