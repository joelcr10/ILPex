
import { Request, Response } from 'express';
import Users from '../../models/users';
import Batches from '../../models/batches';
import Roles from '../../models/roles';
import Trainees from '../../models/trainees';
import * as XLSX from 'xlsx';

interface ExcelRow {
    Name : string;
    Role : string;
    Email : string;
    Password : string;
}

const inputPath = '../../../TemporaryFileStorage/CreateBatchProject.xlsx';

const createBatch = async(req : Request, res : Response, inputFilePath: string = inputPath) : Promise<any> => {
    try{

        const {user_id, batch_name, start_date, end_date} = req.body;

        if(!user_id || !batch_name || !start_date ||!end_date){
            return res.status(404).json({message: 'Missing Fields! Try Again!'});
        }

        const findUser = await Users.findOne({where: {user_id : user_id}});
        if(findUser)
        {
            const checkForSuperAdminprivileges = await Roles.findOne({where : {role_id : findUser.role_id}})
            if(checkForSuperAdminprivileges)
            {
                if(checkForSuperAdminprivileges.role_name === 'Super Admin')
                {
                    const batchWorkbook = XLSX.readFile(inputFilePath);
                    const batchSheetName = batchWorkbook.SheetNames[0];
                    const batchSheet = batchWorkbook.Sheets[batchSheetName];

                    const jsonBatchData: ExcelRow[] = XLSX.utils.sheet_to_json<ExcelRow>(batchSheet);
                    console.log(jsonBatchData);

                    for(const row of jsonBatchData)
                    {
                        const {Name, Role, Email, Password} = row;
                        console.log(Name);
                        const findRole = await Roles.findOne({where : {role_name : Role}});
                        
                        let roleID;
                        if(!findRole)
                            return res.status(400).json({error : "Invalid Role!"});
                        else
                            roleID = findRole.role_id;

                        const createUser = await Users.create({
                            user_name : Name, 
                            email : Email,
                            password : Password,
                            role_id : roleID,
                        });

                        console.log("Created User");

                        const userID = createUser.user_id;

                        const findBatch = await Batches.findOne({where : {batch_name : batch_name}})
                        if (!findBatch) {
                            // Create Batch if batch not found
                            const createdBatch = await Batches.create({
                                batch_name: batch_name,
                                start_date: start_date,
                                end_date: end_date,
                                current_day: 0,
                                isActive: true,
                                created_by: roleID,
                                modified_by: roleID
                            });
                            console.log("Created Batch");
                            // Use the createdBatch to get the batch_id
                            const createTrainee = await Trainees.create({
                                user_id: userID,
                                batch_id: createdBatch.batch_id, // Use the batch_id from the createdBatch
                                name : Name,
                                role : findRole.role_name,
                                isActive: true,
                                createdBy: roleID,
                                modifiedBy: roleID
                            });
                            console.log("Created Trainee");
                        } else {
                            // Use the existing batch
                            const createTrainee = await Trainees.create({
                                user_id: userID,
                                batch_id: findBatch.batch_id, // Use the batch_id from the createdBatch
                                name : Name,
                                role : findRole.role_name,
                                isActive: true,
                                createdBy: findRole.role_id,
                                modifiedBy: findRole.role_id
                            });
                            console.log("Created Trainee");
                        }
                    }
                    return res.status(200).json({message : "Batch Has Been Created Successfully!"});
                }
                else {
                    return res.status(520).json({message : "Only Super Admin Can Create Batches"});
                }
            }
        }
        else
        {
            return res.status(520).json({message : `Invalid User ID`})
        }
        
    }catch(err) {
        return res.status(520).json({error : "Unknown Error Occured : " + err});   
    }
}

export default createBatch;