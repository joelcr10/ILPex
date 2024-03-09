import express,{Request,Response} from 'express';
import userTable from '../../models/users';
import Trainees from '../../models/trainees';
import bcrypt from 'bcrypt';
import findUserId from '../../services/adminServices/findUserId';
import findTrainee from '../../services/adminServices/findTrainee';
import updateTrainee from '../../services/adminServices/updateTrainee';
const app =express();
app.use(express.json());
//...............................API to Manage Users...................................//
const getUsers = async (req:Request,res:Response) => 
{
    try{
        console.log('Entered manageUsers');
        const{userid,status} = req.body;
        if(!userid || status==null){
            return res.status(404).json({message:'All fields are required'});
        }
        else{
            const user = await findUserId(userid);//Service to find a user
            
            if(user == null){
                return res.status(404).json({message:'No User Found'});
            }
            if(user.role_id == 103){
                        const trainee = await findTrainee(userid)//Service to find a trainee
                        console.log(trainee)
                        if(trainee == null){
                            return res.status(404).json({message:'No Trainee Found'});
                        }
                        else{
                            const traine = await updateTrainee(trainee,status)//Service to update a trainee
                            return res.status(200).json({message:`trainee status changed to ${trainee.isActive}`});
                        }
                    }
                
            else{
                return res.status(404).json({message:'This user is not a trainee'});
            }
            }
        
        
    }
    catch(err){
        return res.status(404).json({error:err});
    }
}
export default getUsers;