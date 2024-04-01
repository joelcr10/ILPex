import Percipio_Assessment from "../../models/percipio_assessment";

const percipioAssessmentScoreService=async(trainee_id:number)=>{
    const assessment = await Percipio_Assessment.findAll({where :{trainee_id : trainee_id}});
    return assessment;
}

export default percipioAssessmentScoreService;