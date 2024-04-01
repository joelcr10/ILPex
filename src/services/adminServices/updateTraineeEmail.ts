import Users from '../../models/users';


const updateTraineeEmail =async(user:Users,email:string)=>{
    
    const trainee = await user.update({email:email});
    return trainee;
}
export  default updateTraineeEmail;