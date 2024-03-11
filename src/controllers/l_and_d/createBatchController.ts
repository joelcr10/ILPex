import getUserByUserIdServices from '../../services/l_and_d_services/BatchCreation/getUserByUserIdServices';
import superAdminPrivilegesServices from '../../services/l_and_d_services/BatchCreation/superAdminPrivilegesServices';
import { Request, Response } from 'express';
import createBatchFromExcelServices from '../../services/l_and_d_services/BatchCreation/createBatchFromExcelServices';
import validateDateServices from '../../services/l_and_d_services/BatchCreation/validateDateServices';

// const inputPath = '../../../TemporaryFileStorage/CreateBatchProject.xlsx';
// const inputPath = '../../../TemporaryFileStorage/DummyBatchCreation.xlsx';
const inputPath = '../../../TemporaryFileStorage/ILPBatch3TraineesList.xlsx';

const createBatchController = async(req : Request, res : Response, inputFilePath: string = inputPath) : Promise<any> => {
    try{

        let {user_id, batch_name, start_date, end_date} = req.body;
        const file = req.file;
        user_id = 1;
        console.log(user_id, batch_name, start_date, end_date);
        //To check if all th necessary inputs are available for making the API Call
        if(!user_id || !batch_name || !start_date ||!end_date){
            return res.status(404).json({message: 'Missing Fields! Try Again!'});
        }

        //Date validation
        const dateStatus = validateDateServices(start_date, end_date);
        if(!dateStatus)
            return res.status(400).json({error : "End date cannot be before Start date"})

        //Find the User who is making the API Call
        const findUser = await getUserByUserIdServices(user_id);
        if(findUser && file)
        {
            const findUserWithCorrespondingRoleId = await superAdminPrivilegesServices(findUser.role_id);
            if(findUserWithCorrespondingRoleId)
            {
                //Check if the person is either a Super Admin or a Learning And Development Team Member
                if(findUserWithCorrespondingRoleId.role_name === 'Super Admin' || findUserWithCorrespondingRoleId.role_name === 'Learning And Development')
                {
                    //Function to Create Batch
                    const batchCreation = await createBatchFromExcelServices(req, res, file.path, batch_name, user_id, start_date, end_date);
                    
                    if(batchCreation.message)
                        return res.status(batchCreation.status).json({message : batchCreation.message});
                    else if(batchCreation.error)
                    {
                        console.log("Already Exist In the Database");
                        return res.status(batchCreation.status).json({error : batchCreation.error});
                    }
                    else
                        return res.status(500).json({ error: "Internal Server Error " });
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