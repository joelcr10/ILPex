import * as XLSX from 'xlsx';
import { Request, Response } from 'express';
import getUserByRoleNameServices from './getUserByRoleNameServices';
import createUserServices from './createUserServices';
import findBatchByBatchNameServices from './findBatchByBatchNameServices';
import createTraineeServices from './createTraineeServices';
import createBatchServices from './createBatchServices';
import findDuplicateTraineeServices from './findDuplicateTraineeServices';
import patchUserServices from './patchUserServices';
interface ExcelRow {
    Name : string;
    Role : string;
    Email : string;
    Password : string;
}

const createBatchFromExcelServices = async(req : Request, res : Response, inputPath : string, batch_name : string, userID : number, start_date : string, end_date : string) => {
    const batchWorkbook = XLSX.readFile(inputPath);
    const batchSheetName = batchWorkbook.SheetNames[0];
    const batchSheet = batchWorkbook.Sheets[batchSheetName];

    const jsonBatchData: ExcelRow[] = XLSX.utils.sheet_to_json<ExcelRow>(batchSheet);
    console.log(jsonBatchData);

    for(const row of jsonBatchData)
    {
        const {Name, Role, Email, Password} = row;
        console.log(Name);
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

        
        
        const findBatch = await findBatchByBatchNameServices(batch_name);
        if(findBatch)
        {
            const duplicateTraineeStatus = await findDuplicateTraineeServices(Email);
            if(duplicateTraineeStatus)
            {
                const patchUserStatus = await patchUserServices(duplicateTraineeStatus, Name, Email, batch_name);
            }
            else
            {
                const userCreation = await createUserServices(Name, Role, Email, Password, roleId);
        
                if(!userCreation)
                {
                    return {
                    status : 404,
                    error : 'User creation failed'
                    }
                }
                let newUser_id = userCreation.user_id;

                if(newUser_id && findBatch.batch_id)
                {
                    const traineeCreation = await createTraineeServices(newUser_id, findBatch.batch_id, Name, findRole.role_name, userID)
                    console.log('Trainee has been created Successfully');

                }
                else
                {
                    return {
                        status : 400,
                        error : 'Could not create Trainee because of Invalid data'
                    }
                }   
            }
        }
        else
        {
            const batchCreation = await createBatchServices(batch_name, start_date, end_date, userID);  
            if(batchCreation)
            {
                const userCreation = await createUserServices(Name, Role, Email, Password, roleId);
        
                if(!userCreation)
                {
                    return {
                    status : 404,
                    error : 'User creation failed'
                    }
                }
                
                let newUser_id = userCreation.user_id;

                if(newUser_id && batchCreation.batch_id)
                {
                    const traineeCreation = await createTraineeServices(newUser_id, batchCreation.batch_id, Name, findRole.role_name, userID);
                    console.log('Batch and Trainee has been created successfully!');
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
    return {
        status : 201,
        message : 'Batch has been Created successfully'
    }
}

export default createBatchFromExcelServices;