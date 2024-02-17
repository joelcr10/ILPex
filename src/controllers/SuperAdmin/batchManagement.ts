import express,{Request,Response} from 'express';
import batchTable from '../../models/batches'


const batchmanagement = async(req:Request,res:Response) =>{
    try{
        const{batchId,batchName,endDate,status} = req.body;
        const batch = await batchTable.findOne({where:{batch_id:batchId}});
        if(batch == null){
            return res.status(200).json('No Batch found');
        }
        else{
                if(batchName){
                    await batch.update({batch_name:batchName})

                }
                else if(endDate){

                }
                else if(status){

                }
    }
    }
}