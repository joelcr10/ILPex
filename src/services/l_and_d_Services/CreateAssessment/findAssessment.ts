import Assessment from "../../../../types/modelTypes/assessments";

const findAssessment = async(assessment_name: any)=>{
    const assessment = Assessment.findOne({where : {assessment_name :assessment_name}});
    return assessment;
}

export default findAssessment;