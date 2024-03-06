
import {Router, Request, Response} from "express";
import getAllBatch from "../../services/l_and_d_Services/getAllBatchesServices";

const getAllBatches=async(req:Request,res:Response):Promise<
Response<
  any,
  Record<string,| { message: string }> 
>>=>{
    try{

        const batches=await getAllBatch();

        if(!batches){
            res.status(404).json({message:"No Batch Found"})
        }

        return res.status(200).json({batches});

    }
    catch(err){
        return res.status(500).json({message:err});
    }
}

export default getAllBatches;