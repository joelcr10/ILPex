import Trainee_Progress from "../../models/trainee_progress"

const findCourseProgressInAParticularDayServices = async(trainee_id : number, day_id : number) => {
    const findTraineeProgress = Trainee_Progress.findAll({where : {trainee_id : trainee_id, day_number : day_id}});
    return findTraineeProgress;
}

export default findCourseProgressInAParticularDayServices;