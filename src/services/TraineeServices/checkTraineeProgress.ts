import Trainee_Progress from "../../models/trainee_progress";

const checkTraineeProgress = async (trainee_id: number, course_id: number, day_number: number) =>{
    try{
        const TrackExist = await Trainee_Progress.findOne({
            where: {
                trainee_id: trainee_id, 
                course_id: course_id, 
                day_number: day_number
            }
        });
    
        return TrackExist;
    }catch(error){
        console.log(error);
        return null;
    }
    

}

export default checkTraineeProgress;