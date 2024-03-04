import Trainees from "../../../models/trainees";

const findTraineesOfABatchServices =async(batch_id : number) => {
    const findTrainees = await Trainees.findAll({where : {batch_id : batch_id}});
    if(findTrainees)
        return findTrainees;
    else
        return (
                {
                    status : 404,
                    message : "Trainees Doesn't Exist"
                }
            );
}

export default findTraineesOfABatchServices;