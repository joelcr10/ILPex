import Assessment from "../../../types/modelTypes/assessments";
import Assessment_Batch_Allocation from "../../models/assessment_batch_allocation";
import Results from "../../models/results";
import getAssessmentName from "./getAssessmentName";



const getTraineeScoresServices=async(trainee_id:number)=>{
    const results=await Results.findAll({
        where:{trainee_id:trainee_id},
        attributes: ['result_id', 'assessment_batches_allocation_id', 'trainee_id', 'first_score','high_score','assessment_attempts'],
    })

    const scores = await Promise.all(results.map(async (result) => {
        const {result_id,assessment_batches_allocation_id,trainee_id,first_score,high_score,assessment_attempts} = result;
        const assessmentName = await getAssessmentName(assessment_batches_allocation_id);
        return {
            result_id,
            assessment_batches_allocation_id,
            trainee_id,
            first_score,
            high_score,
            assessment_attempts,
            assessmentName
        };
    }));

    const ScoreSum = results.reduce((sum, score) => sum + (score.high_score ?? 0), 0);
    const scoreAverage = ScoreSum / results.length;
  
    const noOfAssessmentsAttemted = results.length;
  
    return {scores,noOfAssessmentsAttemted ,scoreAverage};

}

export default getTraineeScoresServices;