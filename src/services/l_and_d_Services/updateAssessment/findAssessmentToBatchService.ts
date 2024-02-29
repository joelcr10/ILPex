import Assessment_Batch_Allocation from "../../../models/assessment_batch_allocation";

const findAssessmentToBatchService = async(assessment_id: number,batch_id : number)=>{
    const assessment = Assessment_Batch_Allocation.findOne({where : {assessment_id :assessment_id,batch_id : batch_id}});
    return assessment;
}

export default findAssessmentToBatchService;