import Trainee_Progress from "../../models/trainee_progress";

const getDayTraineeProgress = async(trainee_id: number,day_number: number) => {
    const progress = await Trainee_Progress.findAll({
        where: {day_number: day_number, trainee_id: trainee_id},
        attributes: ['trainee_id','course_id','day_number','completion_status']
    
    });
    
    return progress;

}
 
export default getDayTraineeProgress;