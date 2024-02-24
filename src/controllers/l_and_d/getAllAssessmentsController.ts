
import {Router, Request, Response} from "express";
import Batches from "../../models/batches";
import getAllAsssessmentsServices from "../../services/l_and_d_services/getAllAssessmentServices";


const getAllAsssessment=async(req:Request,res:Response):Promise<
Response<
  any,
  Record<string,| { message: string }> 
>>=>{
    try{  
        //Call the service function to assessment data 
        const assessments =await getAllAsssessmentsServices();

        console.log(assessments);
        
        if(assessments==null){
            return res.status(404).json({message:"No Result Found"});
        }
        return res.status(200).json(assessments);
        
    }
    catch(err){
        return res.status(500).json(err);
    }
}

export default getAllAsssessment;