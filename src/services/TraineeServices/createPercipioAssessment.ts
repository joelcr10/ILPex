import Percipio_Assessment from "../../models/percipio_assessment";

const createPercipioAssessment = async (trainee_id: number, batch_id: number, course_id: number, day_number: number, first_score: number, high_score: number, last_score: number) => {
    try{
        const newAssessment = await Percipio_Assessment.create({
                trainee_id: trainee_id,
                batch_id: batch_id,
                course_id: course_id,
                day_number: day_number,
                first_score: first_score,
                high_score: high_score,
                last_score: last_score
            })
        return newAssessment;
    }catch(error){
        console.log(error);
        return null;
    }
}
 
export default createPercipioAssessment;