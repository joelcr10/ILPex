import Questions from "../../../models/questions";

const getQuestionsService = async(assessment_id:number)=>{

   const questions= await Questions.findAll({
    where: {
      assessment_id: assessment_id,
    },
    attributes: [
      'question_id',
      'question',
      'option_a',
      'option_b',
      'option_c',
      'option_d',
      'correct_answer',
    ],
  });
      
    return questions;
   

      

}
export default getQuestionsService;