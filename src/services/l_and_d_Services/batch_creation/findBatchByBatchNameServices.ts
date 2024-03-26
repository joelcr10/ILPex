import Batches from "../../../models/batches";

const findBatchByBatchNameServices = async(batch_name : string) => {
    const findBatch = await Batches.findOne({where : {batch_name : batch_name}})
    return findBatch;
}

export default findBatchByBatchNameServices;