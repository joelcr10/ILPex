import Assessment_Batch_Allocation from "../../../models/assessment_batch_allocation";
import Assessments from "../../../models/assessments";

const uploadAssessmentToBatch = async(assessment : Assessments,batch_id : number,user_id : number, start_date: Date,end_date : Date)=>{
    const assessmentToBatch = await Assessment_Batch_Allocation.create({assessment_id : assessment.assessment_id, batch_id : batch_id,createdBy : user_id,assessment_status:true,start_date : start_date, end_date : end_date})
}

export default uploadAssessmentToBatch;