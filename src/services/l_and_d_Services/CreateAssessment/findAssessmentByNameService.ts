import Assessment from "../../../../types/modelTypes/assessments";

const findAssessmentByNameService = async(assessment_name: string)=>{
    const assessment = Assessment.findOne({where : {assessment_name :assessment_name}});
    return assessment;
}

export default findAssessmentByNameService;