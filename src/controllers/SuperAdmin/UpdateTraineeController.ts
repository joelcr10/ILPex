import express,{Request,Response} from 'express';
import findUserId from '../../services/adminServices/findUserId';
import findTrainee from '../../services/adminServices/findTrainee';
import updateTrainee from '../../services/adminServices/updateTrainee';
import updateTraineeName from '../../services/adminServices/updateTraineName';
import updateTraineeEmail from '../../services/adminServices/updateTraineeEmail';
const app =express();
app.use(express.json());

//...............................API to Manage Users...................................//
const updateTrainees = async (req:Request,res:Response) => 
{
    try{
        // nigin.n@experionglobal.com
        console.log('Entered manageUsers');
        const{user_id,status,user_name,email} = req.body;
        if(!user_id && status!==0 && user_name!==0 && email!==0){
            return res.status(404).json({message:'All fields are required'});
        }
        else{
            const user = await findUserId(user_id);//Service to find a user
            
            if(user == null){
                return res.status(404).json({message:'No User Found'});
            }
            if(user.role_id == 103){
                        const trainee = await findTrainee(user_id)//Service to find a trainee
                        const user = await findUserId(user_id);
                        console.log(trainee)
                        if(trainee == null){
                            return res.status(404).json({message:'No Trainee Found'});
                        }
                        else{
                            if(status != null){
                                const traine = await updateTrainee(trainee,status)//Service to update a trainee
                                return res.status(200).json({message:`trainee status changed to ${traine.isActive}`});
                            }
                            if(user_name && user){
                                const traine = await updateTraineeName(user,user_name)//Service to update a trainee name.
                                return res.status(200).json({message:`trainee name changed to ${traine.user_name}`});
                            }
                            if(email && user){
                                const traine = await updateTraineeEmail(user,email)//Service to update a trainee name.
                                return res.status(200).json({message:`trainee email changed to ${traine.email}`});
                            }
                            
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
export default updateTrainees;