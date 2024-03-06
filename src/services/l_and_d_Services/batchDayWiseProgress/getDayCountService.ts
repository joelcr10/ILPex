import Trainee_Progress from "../../../models/trainee_progress";

const getBatchCurrentDay=async(batch_id:number)=>{

    const currentDay=await Trainee_Progress.findAll({
        where:{batch_id : batch_id},
        attributes: ['day_number'],
        order: [['day_number', 'DESC']],
        limit: 1,
    })

    return currentDay;
}


export default getBatchCurrentDay;
