import Results from "../../../models/results";

type AssessmentListType = {
    assessment_batch_allocation_id: number;
    assessment_id: number;
    end_date: Date;
  }[];

const checkIfAssessmentAttended = async (assessmentsList:AssessmentListType,trainee_id: number) => {
  //Fetching all the assessments assigned to a particular batch.
  const results = await Results.findAll({
    where: {
      assessment_batches_allocation_id: assessmentsList.map(
        (assessment) => assessment.assessment_batch_allocation_id
      ),
      trainee_id:trainee_id,
    },
  });

  return results;
};
export default checkIfAssessmentAttended;
