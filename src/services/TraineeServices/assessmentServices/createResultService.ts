import Results from "../../../models/results";

const createResultService = async(assessmentId:number,trainee_id:number,score:number)=>{

    await Results.create({
        assessment_batches_allocation_id: assessmentId,
        trainee_id: trainee_id,
        first_score: score,
        high_score: score,
        assessment_attempts: 1,
      });
   

      

}
export default createResultService;