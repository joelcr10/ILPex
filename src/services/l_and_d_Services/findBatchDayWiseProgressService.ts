import Trainee_Progress from "../../models/trainee_progress";

const findBatchDayWiseProgressService = async(batch_id: number,day_number : number)=>{
    const batchProgressCount = await Trainee_Progress.count({where : {batch_id : batch_id,completion_status : "COMPLETED",day_number : day_number}});
    return batchProgressCount;
}

export default findBatchDayWiseProgressService;