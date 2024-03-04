import { Request,Response } from "express";
import findBatchDayWiseProgressService from "../../services/l_and_d_Services/findBatchDayWiseProgressService";

const getBatchDayWiseProgress=async(req:Request,res:Response)=>{
    try{
        const batch_id :number=parseInt(req.params.trainee_id as string);

        if(!batch_id){
            return res.status(400).json({message:"Please ensure that the batch_id is provided"});
        } 
        const batchDayWiseProgress = findBatchDayWiseProgressService(batch_id);
        if(!batchDayWiseProgress){
            return res.status(400).json({error : "invalid trainee_id"});
        }
        else{
            const count = (await batchDayWiseProgress).length;
            return res.status(200).json({message : "Query successfull"})
        }
    }
    catch(err){
        
    }
}