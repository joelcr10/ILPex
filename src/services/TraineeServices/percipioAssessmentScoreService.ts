import Percipio_Assessment from "../../models/percipio_assessment";

const percipioAssessmentScoreService=async(trainee_id:number,course_id:number)=>{
    const assessment = await Percipio_Assessment.findOne({where :{trainee_id : trainee_id,course_id : course_id}});
    return assessment;
}

export default percipioAssessmentScoreService;