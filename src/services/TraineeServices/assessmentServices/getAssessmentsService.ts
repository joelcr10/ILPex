import Assessments from "../../../models/assessments";

const getAssessmentsService = async(batch_id:number)=>{

  //Fetching all the assessments assigned to a particular batch.
   const assessments= await Assessments.findAll({
    where: {
      batch_id: batch_id,
    },
    attributes: ['assessment_id','assessment_name', 'assessment_date'], 
  });
      
        return assessments;
   

      

}
export default getAssessmentsService;