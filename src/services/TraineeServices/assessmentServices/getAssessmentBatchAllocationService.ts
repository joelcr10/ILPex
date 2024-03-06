import Assessment_Batch_Allocation from "../../../models/assessment_batch_allocation";

const getAssessmentBatchAllocation = async (batch_id: number) => {
  //Fetching all the assessments assigned to a particular batch.
  const assessmentsList = await Assessment_Batch_Allocation.findAll({
    where: {
      batch_id: batch_id,
    },
    attributes: ["assessment_batch_allocation_id", "assessment_id", "end_date"],
  });

  return assessmentsList;
};
export default getAssessmentBatchAllocation;
