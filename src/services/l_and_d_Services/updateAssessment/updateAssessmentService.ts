import Assessment_Batch_Allocation from "../../../models/assessment_batch_allocation";

const updateAssessmentService = async(assessment_id:number,batch_id:number,start_date:Date,end_date:Date)=>{
    const assessment_update = await Assessment_Batch_Allocation.create({assessment_id:assessment_id,batch_id:batch_id,assesment_status : false,start_date:start_date,end_date:end_date},{raw:true});
    return assessment_update;
}

export default updateAssessmentService;