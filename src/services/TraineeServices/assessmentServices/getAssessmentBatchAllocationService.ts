import { Op } from "sequelize";
import Assessment_Batch_Allocation from "../../../models/assessment_batch_allocation";

const getAssessmentBatchAllocation = async (batch_id: number) => {
  //Fetching all the assessments assigned to a particular batch.
  const currentDate = new Date();

  const assessmentsList = await Assessment_Batch_Allocation.findAll({
    where: {
      batch_id: batch_id,
      start_date: { [Op.lte]: currentDate },
      end_date: { [Op.gte]: currentDate }, 
    },
    attributes: ["assessment_batch_allocation_id", "assessment_id", "end_date", "start_date","number_of_attempts"],
  });

  return assessmentsList;
};
export default getAssessmentBatchAllocation;
