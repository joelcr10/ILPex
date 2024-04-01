import Trainees from "../../models/trainees";

const findUserIdByTraineeIdServices = async(trainee_id : number) => {
    const findUserId = await Trainees.findOne({where : {trainee_id : trainee_id}});
        return findUserId.user_id;
}

export default findUserIdByTraineeIdServices;