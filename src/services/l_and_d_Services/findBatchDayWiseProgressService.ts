import Results from "../../models/results";

const findBatchDayWiseProgressService = async(batch_id: number)=>{
    const batches = await Results.findAll({where : {batch_id : batch_id,completion_status : "COMPLETED"}});
    return batches;
}

export default findBatchDayWiseProgressService;