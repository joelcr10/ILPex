import {Router, Request, Response} from "express";
import assesments from '../../models/assessments';


const getAllAsssessment=async(req:Request,res:Response):Promise<
Response<
  any,
  Record<string,| { message: string }> 
>>=>{
    try{
        const assessments=await assesments.findAll();
        if(assessments==null){
            return res.status(404).json({message:"no assessment found"});
        }
        return res.status(200).json(assessments);
        
    }
    catch(err){
        return res.status(500).json(err);
    }
}

// {batch_name:string,start_date:Date,end_date:Date,current_day:Date,isActive:boolean}

export default getAllAsssessment;