import express,{Request,Response} from 'express';
import batchTable from '../../models/batches'


const batchmanagement = async(req:Request,res:Response) =>{
    try{
        const{batchId,batchName,endDate,startDate,status} = req.body;
        const batch = await batchTable.findOne({where:{batch_id:batchId}});
        if(batch == null){
            return res.status(200).json('No Batch found');
        }
        else{
                if(batchName){
                    await batch.update({batch_name:batchName})
                    return res.status(200).json('Batch Name Updated');
                }
                else if(endDate){
                    await batch.update({end_date:endDate})
                    return res.status(200).json('End Date Updated');
                }
                else if(startDate){
                    await batch.update({start_date:startDate})
                    return res.status(200).json('Start Date Updated');
                }
    }
    }catch(err){
        return res.status(404).json(err);

}
}
export default batchmanagement;