import getUserByUserId from '../../services/l_and_d_Services/BatchCreation/getUserByUserId';
import superAdminPrivileges from '../../services/l_and_d_Services/BatchCreation/superAdminPrivileges';
import { Request, Response } from 'express';
import Users from '../../models/users';
import Batches from '../../models/batches';
import Roles from '../../models/roles';
import Trainees from '../../models/trainees';
import * as XLSX from 'xlsx';
import createBatchFromExcel from '../../services/l_and_d_Services/BatchCreation/createBatchFromExcel';

const inputPath = '../../../TemporaryFileStorage/CreateBatchProject.xlsx';

const createBatchController = async(req : Request, res : Response, inputFilePath: string = inputPath) : Promise<any> => {
    try{

        const {user_id, batch_name, start_date, end_date} = req.body;

        if(!user_id || !batch_name || !start_date ||!end_date){
            return res.status(404).json({message: 'Missing Fields! Try Again!'});
        }

        const findUser = await getUserByUserId(user_id);
        if(findUser)
        {
            const findUserWithCorrespondingRoleId = await superAdminPrivileges(findUser.role_id);
            if(findUserWithCorrespondingRoleId)
            {
                if(findUserWithCorrespondingRoleId.role_name === 'Super Admin' || findUserWithCorrespondingRoleId.role_name === 'Learning And Development')
                {
                    const batchCreation = await createBatchFromExcel(req, res, inputFilePath, batch_name, user_id, start_date, end_date);
                    
                    res.status(201).json({message : 'Batch has Been created successfully!'});
                }
                else
                {
                    return res.status(401).json({message : "This user does not have the permission to create a batch"});
                }
            }
            else
            {
                return res.status(401).json({message : "This is not a Super Admin"});
            }
        }
        else
        {
            return res.status(404).json({error : "Such a user doesn't exist!"});
        }
    }catch(err) {
        return res.status(520).json({error : "Unknown Error Occured : " + err});   
    }
}

export default createBatchController;