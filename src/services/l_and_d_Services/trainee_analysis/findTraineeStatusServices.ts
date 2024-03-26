import Trainee_Progress from "../../../models/trainee_progress";

const findTraineeStatusServices = async(trainee_id : number, currentDay : number) => {
    let findStatus = await Trainee_Progress.count({where: {trainee_id : trainee_id, day_number : currentDay}})
    if (findStatus === null)
        return 0;
    return findStatus;
}

export default findTraineeStatusServices;
