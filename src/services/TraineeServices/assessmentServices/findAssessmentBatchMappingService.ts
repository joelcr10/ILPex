// findAssessmentBatchMapping

import Assessment_Batch_Allocation from "../../../models/assessment_batch_allocation";

const findAssessmentBatchMapping = async (batch_id: number,assessmentId:number) => {
  //Fetching all the assessments assigned to a particular batch.
  const assessmentBatchAllocation=await Assessment_Batch_Allocation.findOne({
    where: {
      batch_id: batch_id,
      assessment_id:assessmentId,
    },
  });

  return assessmentBatchAllocation;
};
export default findAssessmentBatchMapping;
