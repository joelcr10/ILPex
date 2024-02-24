import Assessment from "../../../../types/modelTypes/assessments";

const findAssessmentService = async(assessment_id: number)=>{
    const assessment = Assessment.findOne({where : {assessment_id :assessment_id}});
    return assessment;
}

export default findAssessmentService;