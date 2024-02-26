import Trainees from '../../models/trainees'

const findTrainee =async(user_id:number)=>{
    
    const traine = await Trainees.findOne({where:{user_id:user_id}})
    return traine;
}
export  default findTrainee;