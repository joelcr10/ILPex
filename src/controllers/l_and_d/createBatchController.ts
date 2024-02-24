import getUserByUserIdServices from '../../services/l_and_d_Services/BatchCreation/getUserByUserIdServices';
import superAdminPrivilegesServices from '../../services/l_and_d_Services/BatchCreation/superAdminPrivilegesServices';
import { Request, Response } from 'express';
import createBatchFromExcelServices from '../../services/l_and_d_Services/BatchCreation/createBatchFromExcelServices';

const inputPath = '../../../TemporaryFileStorage/CreateBatchProject.xlsx';

const createBatchController = async(req : Request, res : Response, inputFilePath: string = inputPath) : Promise<any> => {
    try{

        const {user_id, batch_name, start_date, end_date} = req.body;

        if(!user_id || !batch_name || !start_date ||!end_date){
            return res.status(404).json({message: 'Missing Fields! Try Again!'});
        }

        const findUser = await getUserByUserIdServices(user_id);
        if(findUser)
        {
            const findUserWithCorrespondingRoleId = await superAdminPrivilegesServices(findUser.role_id);
            if(findUserWithCorrespondingRoleId)
            {
                if(findUserWithCorrespondingRoleId.role_name === 'Super Admin' || findUserWithCorrespondingRoleId.role_name === 'Learning And Development')
                {
                    const batchCreation = await createBatchFromExcelServices(req, res, inputFilePath, batch_name, user_id, start_date, end_date);
                    
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