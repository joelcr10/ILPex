import Assessment_Batch_Allocation from "../../../models/assessment_batch_allocation";

const updateAssessmentService = async(user_id:number,assessment_id:number,batch_id:number,start_date:Date,end_date:Date)=>{
    const assessment_update = await Assessment_Batch_Allocation.create({createdBy : user_id,assessment_id:assessment_id,batch_id:batch_id,assessment_status : true,start_date:start_date,end_date:end_date},{raw:true});
    return assessment_update;
}

export default updateAssessmentService;