import { Op,Sequelize } from "sequelize";
import {Router, Request, Response} from "express";
import Batches from '../../models/batches';
import batchDetailsServices from "../../services/l_and_d_Services/batchDetailsServices";

const getBatchDetails=async(req:Request,res:Response):Promise<
Response<
  any,
  Record<string,| { message: string }|{batch_details:object}> 
>>=>{
    try{
        const batch_id :number=parseInt(req.query.batch_id as string);
        
        if(!batch_id){
            return res.status(400).json({message:"Batch ID is required."});
        }
        
        ////Call the service function to get batches details
        const batch_details= await batchDetailsServices(batch_id);

        if(batch_details==null){
            return res.status(404).json({message:"Batch Not Found"});
        }
        return res.status(200).json({batch_details:batch_details});
        
    }
    catch(err){
        return res.status(500).json({message:err});
    }
}

export default getBatchDetails;