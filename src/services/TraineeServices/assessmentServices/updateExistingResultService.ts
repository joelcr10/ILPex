import Results from "../../../models/results";

const updateExistingResultService = async(score:number,existingResult:Results)=>{
    console.log("\n\n\n\n\n\n\n",score)
    await existingResult.update({
        high_score: score,
        });
}
export default updateExistingResultService;