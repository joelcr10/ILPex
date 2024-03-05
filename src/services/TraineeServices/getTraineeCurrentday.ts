import Trainee_Progress from "../../models/trainee_progress";



const getTraineeCurrentDay=async(trainee_id:number)=>{

    const currentDay=await Trainee_Progress.findAll({
        where:{trainee_id:trainee_id},
        attributes: ['day_number'],
        order: [['day_number', 'DESC']],
        limit: 1,
    })

    return currentDay;
}


export default getTraineeCurrentDay;
