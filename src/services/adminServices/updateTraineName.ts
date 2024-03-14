import Users from '../../models/users';


const updateTraineeName =async(user:Users,user_name:string)=>{
    
    const trainee = await user.update({user_name:user_name});
    return trainee;
}
export  default updateTraineeName;