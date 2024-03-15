import Trainee_Progress from "../../models/trainee_progress";

const createTraineeProgress = async (trainee_id: number, batch_id: number, course_id: number, day_number: number, completion_status: string, duration: string, estimated_duration: string) => {
    try{
        const newTrack = await Trainee_Progress.create({
            trainee_id: trainee_id,
            batch_id: batch_id,
            day_number: day_number,
            course_id: course_id,
            completion_status: "COMPLETED",
            duration: duration,
            estimated_duration: estimated_duration 
          });

        return newTrack;
    }catch(error){
        console.log(error);
        return null;
    }
}
 
export default createTraineeProgress;