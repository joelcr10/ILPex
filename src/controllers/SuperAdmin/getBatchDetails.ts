import { Op,Sequelize } from "sequelize";
import {Router, Request, Response} from "express";
import Batches from '../models/batches';

const getBatchDetails=async(req:Request,res:Response):Promise<
Response<
  any,
  Record<string,| { message: string }> 
>>=>{
    try{
        const{batch_id}=req.body;
        
        if(!batch_id){
            return res.status(400).json({message:"batch_id not defined"});
        }
        const batch_details=await Batches.findAll({where:{batch_id:batch_id}});
        
        if(batch_details==null){
            return res.status(404).json({message:"invalid batch_id"});
        }
        return res.status(200).json(batch_details);
        
    }
    catch(err){
        return res.status(500).json(err);
    }
}

// {batch_name:string,start_date:Date,end_date:Date,current_day:Date,isActive:boolean}

export default getBatchDetails;