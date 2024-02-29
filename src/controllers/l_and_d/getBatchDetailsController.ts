import { Op,Sequelize } from "sequelize";
import {Router, Request, Response} from "express";
import Batches from '../../models/batches';
import batchDetailsServices from "../../services/l_and_d_services/batchDetailsServices";
import getTraineesCount from "../../services/l_and_d_Services/getTraineesCount";

const getBatchDetails=async(req:Request,res:Response):Promise<
Response<
  any,
  Record<string,| { message: string }> 
>>=>{
    try{
        const batch_id :number=parseInt(req.params.batch_id as string);
        
        if(!batch_id){
            return res.status(400).json({message:"Invalid Batch ID"});
        }  
        
        ////Call the service function to get batches details
        const batch_details= await batchDetailsServices(batch_id);

        const noOfTrainees=await getTraineesCount(batch_id);

        if(noOfTrainees==0){
            return res.status(404).json({message:"No Trainees Found in the Specified Batch"});
        }

        if(batch_details==null){
            return res.status(404).json({message:"Batch Not Found"});
        }
        return res.status(200).json({batch_details,noOfTrainees});
        
    }
    catch(err){
        return res.status(500).json({message:err});
    }
}

export default getBatchDetails;