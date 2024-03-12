
import {Router, Request, Response} from "express";
import Batches from "../../models/batches";
import getAllAsssessmentsServices from "../../services/l_and_d_services/getAllAssessmentServices";


const getAllAsssessment=async(req:Request,res:Response):Promise<
Response<
  any,
  Record<string,| { message: string }> 
>>=>{
    try{  
          //query parameters
          const offset: number = parseInt(req.query.offset as string) || 0;
          const sortKey: string = req.query.sortKey as string||"assessment_name";
          const sortOrder: string = req.query.sortOrder as string === '-1' ? 'DESC' : 'ASC';

          if(sortKey!=="assessment_name"){
            return res.status(400).json({message:"Invalid SortKey"})
          }

        //Call the service function to assessment data 
        const assessments =await getAllAsssessmentsServices(offset,sortKey,sortOrder);

        console.log(assessments);
        
        if(assessments==null){
            return res.status(404).json({message:"No Result Found"});
        }
        return res.status(200).json({assessments});
        
    }
    catch(err){
        return res.status(500).json(err);
    }
}

export default getAllAsssessment;