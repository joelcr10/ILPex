import Assessment_Batch_Allocation from "../../../models/assessment_batch_allocation";

const updateAssessmentService = async(assessment_id:number,batch_id:number)=>{
    const assessment_update = await Assessment_Batch_Allocation.create({assessment_id:assessment_id,batch_id:batch_id},{raw:true});
    return assessment_update;
}

export default updateAssessmentService;