import batchTable from '../../models/batches'
const findBatch =async(batchId:number)=>{
    const batch = await batchTable.findOne({where:{batch_id:batchId}});
    return batch;
}
export  default findBatch;