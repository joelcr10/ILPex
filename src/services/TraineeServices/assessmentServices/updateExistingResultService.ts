import Results from "../../../models/results";

const updateExistingResultService = async (
  score: number,
  existingResult: Results
) => {
  await existingResult.update({
    high_score: score,
  });
};
export default updateExistingResultService;
