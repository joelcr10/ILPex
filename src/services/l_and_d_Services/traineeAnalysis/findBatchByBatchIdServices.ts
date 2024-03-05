import Batches from "../../../models/batches";

const findBatchByBatchIdServices = async(batch_id : number) => {
    const findBatch = await Batches.findOne({where : {batch_id : batch_id}})
    return findBatch;
}

export default findBatchByBatchIdServices;