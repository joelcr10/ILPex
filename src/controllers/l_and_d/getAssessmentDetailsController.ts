import {Router, Request, Response} from "express";
import getQuestionsService from "../../services/TraineeServices/assessmentServices/getQuestionsService";
import getAssessmentBatch from "../../services/l_and_d_Services/getAssessmentBatchesServices";


const getAssessmentDetails=async(req:Request,res:Response):Promise<
Response<
  any,
  Record<string,| { message: string }> 
>>=>{
    try{
        const assesment_id :number=parseInt(req.params.assessment_id as string);

        if(assesment_id==null){
            return res.status(400).json({message:"Assessment Id not defined"});
        }
        
        const questions=await getQuestionsService(assesment_id);

        if(questions==null){
            return res.status(404).json({message:"No Questions Found"})
        }

        const assessmentBatch=await getAssessmentBatch(assesment_id);

        if(assessmentBatch==null){
            return res.status(404).json({message:"No Assessment Found"})
        }
        

        return res.status(200).json({questions,assessmentBatch});
    }
    catch(err){
        return res.status(500).json({message:err});
    }
}

export default getAssessmentDetails;