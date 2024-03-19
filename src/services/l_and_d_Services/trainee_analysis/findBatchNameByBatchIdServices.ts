import Batches from "../../../models/batches"

const findBatchNameByBatchIdServices = async(batch_id : number) => {
    const findBatchName = Batches.findOne({where : {batch_id : batch_id}});
    return findBatchName;
}

export default findBatchNameByBatchIdServices;