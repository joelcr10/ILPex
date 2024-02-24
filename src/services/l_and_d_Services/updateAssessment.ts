import Assessments from "../../models/assessments";

const updateAssessment = async(assessment_id:number,batch_id:number)=>{
    const assessment_update = await Assessments.update({batch_id:batch_id}, {where :{assessment_id:assessment_id}});
    return assessment_update;
}

export default updateAssessment;