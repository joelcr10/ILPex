import Trainee_Progress from "../../models/trainee_progress";

const individualTraineeProgress = async (trainee_id:number) =>{
    try{
        const progress = await Trainee_Progress.findAll({
            where: {trainee_id: trainee_id},
            order: [
                ['day_number', 'DESC'],
            ]
        
        });

        return progress

    }catch(error){
        console.log(error);
        return null;
    }
    

   
}

export default individualTraineeProgress;