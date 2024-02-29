import Results from "../../../models/results";

const getExistingResultService = async(assessment_batches_allocation_id:number,trainee_id:number)=>{

   const existingResult= await Results.findOne({
    where: {
      assessment_batches_allocation_id: assessment_batches_allocation_id,
      trainee_id:trainee_id,
    },
  });
      
        return existingResult;
   

      

}
export default getExistingResultService;