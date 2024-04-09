import Batches from "../../models/batches"

const findEndDateOfTheBatchByBatchIdServices = async(batch_id : number) => {
    const findBatch = await Batches.findOne({where : {batch_id : batch_id, isActive : true}});
    if(findBatch) {
        const endDateOfTheBatch = findBatch.end_date;
        return endDateOfTheBatch;
    }
}

export default findEndDateOfTheBatchByBatchIdServices;