import Trainees from "../../models/trainees"

const findBatchIdByTraineeIdServices = async (trainee_id : number) => {
    const findTraineeDetails = await Trainees.findOne({where : {trainee_id : trainee_id}});
    const batch_id = findTraineeDetails.batch_id;

    return batch_id;
}

export default findBatchIdByTraineeIdServices;