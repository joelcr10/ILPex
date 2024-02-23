import Assessment from "../../../../types/modelTypes/assessments";

const findAssessment = async(assessment_name: string, batch_id:number)=>{
    const assessment = Assessment.findOne({where : {assessment_name :assessment_name,batch_id : batch_id}});
    return assessment;
}

export default findAssessment;