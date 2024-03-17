import Trainee_Progress from "../../models/trainee_progress"

const getTraineePercipioData =async(trainee_id : number) => {
    const getTraineeData = Trainee_Progress.findAll({where : {trainee_id : trainee_id}});
    return getTraineeData;
}

export default getTraineePercipioData;