import Assessments from "../../../models/assessments";

const findAssessmentService = async(assessment_name : string)=>{
    const assessment_found = await Assessments.findOne({where : {assessment_name : assessment_name}});
    return assessment_found;
}

export default findAssessmentService;