import Results from "../../models/results";


const getTraineeScoresServices=async(trainee_id:number)=>{
    const scores=await Results.findAll({
        where:{trainee_id:trainee_id},
        attributes: ['result_id', 'assessment_batches_allocation_id', 'trainee_id', 'first_score','high_score','assessment_attempts'],
    })

    const ScoreSum = scores.reduce((sum, score) => sum + (score.high_score ?? 0), 0);
    const ScoreAverage = ScoreSum / scores.length;
  
    const noOfAssessmentsAttemted = scores.length;
  
    return { scores,noOfAssessmentsAttemted ,ScoreAverage};

}

export default getTraineeScoresServices;