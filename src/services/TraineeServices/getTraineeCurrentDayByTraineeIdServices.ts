import Trainees from "../../models/trainees"

const getTraineeCurrentDayByTraineeIdServices = async (trainee_id : number) => {
    const traineeDetails = await Trainees.findOne({where : {trainee_id : trainee_id}});
    return traineeDetails.current_day;
}

export default getTraineeCurrentDayByTraineeIdServices;