import Batches from "../../../models/batches";

const findBatchService =async (batch_id : number)=>{
    const batch_found = await Batches.findOne({where : {batch_id : batch_id}});
    return batch_found;
}

export default findBatchService;