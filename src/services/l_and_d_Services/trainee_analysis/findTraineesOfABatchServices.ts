import Trainees from "../../../models/trainees";

const findTraineesOfABatchServices =async(batch_id : number) => {
    const findTrainees = await Trainees.findAll({where : {batch_id : batch_id, isActive : true}});
    if(findTrainees)
        return findTrainees;
    // else
    // return {
    //     status : 404,
    //     error : 'User already exists in the Database!'
    //     }
}

export default findTraineesOfABatchServices;