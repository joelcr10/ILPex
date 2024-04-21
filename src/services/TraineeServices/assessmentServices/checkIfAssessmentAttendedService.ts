import Results from "../../../models/results";
import { Op } from "sequelize";

type AssessmentListType = {
  assessment_batch_allocation_id: number;
  assessment_id: number;
  end_date: Date;
  number_of_attempts: number;
}[];

const checkIfAssessmentAttended = async (assessmentsList: AssessmentListType, trainee_id: number) => {
  //Fetching all the assessments assigned to a particular batch.
  const assessmentIds = assessmentsList.map((assessment) => assessment.assessment_batch_allocation_id);

  const results = await Results.findAll({
    where: {
      trainee_id: trainee_id,
      [Op.and]: assessmentsList.map((assessment) => ({
        assessment_batches_allocation_id: assessment.assessment_batch_allocation_id,
        assessment_attempts: { [Op.gte]: assessment.number_of_attempts },
      })),
    },
  });

  return results;
};

export default checkIfAssessmentAttended;
