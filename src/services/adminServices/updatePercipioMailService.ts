import Users from '../../models/users';


const updatePercipioMail =async(user:Users,percepio_mail:string)=>{
    
    const trainee = await user.update({percepio_mail:percepio_mail});
    return trainee;
}
export  default updatePercipioMail;