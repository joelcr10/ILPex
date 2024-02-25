import Results from "../../../models/results";

const getExistingResultService = async(assessmentId:number,trainee_id:number)=>{

   const existingResult= await Results.findOne({
    where: {
      assessment_id: assessmentId,
      trainee_id:trainee_id,
    },
  });
      
        return existingResult;
   

      

}
export default getExistingResultService;