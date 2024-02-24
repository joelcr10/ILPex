import Trainees from '../../models/trainees'

const updateTrainee =async(traine:any,status:string)=>{
    
    await traine.update({isActive:status});
}
export  default updateTrainee;