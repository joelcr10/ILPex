import Trainees from '../../models/trainees'

const updateTrainee =async(traine:any,status:boolean)=>{
    
    const trainee = await traine.update({isActive:status});
    return trainee;
}
export  default updateTrainee;