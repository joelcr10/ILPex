import Trainees from "../../models/trainees"


const updateTraineeCurrentDayService = async(trainee_id : number, day_number: number) => {
    const findTrainee = await Trainees.findOne({where : {trainee_id : trainee_id}});

    if(findTrainee==null){
        return null;
    }

    const updateCurrentDay = findTrainee.update({
        current_day: day_number
    })
    
    return updateCurrentDay;
}

export default updateTraineeCurrentDayService;