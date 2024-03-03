import Assessments from "../../../models/assessments";

const getAssessmentDetailsService = async (assessmentIds: number[]) => {
  //Fetching all the assessments details.
  const assessmentNames = await Assessments.findAll({
    where: {
      assessment_id: assessmentIds,
    },
    attributes: ["assessment_id", "assessment_name"],
  });

  return assessmentNames;
};
export default getAssessmentDetailsService;