import { Request, Response } from "express";
import individualTraineeProgress from "../../services/TraineeServices/individualTraineeProgress";
import getDayTraineeProgress from "../../services/TraineeServices/getDayTraineeProgress";
import getDaywiseCourseServices from "../../services/TraineeServices/getDaywiseCourseServices";

const dayCardController = async (req: Request, res: Response) =>{

    const trainee_id = Number(req.params.trainee_id);
    
    const traineeProgress = await individualTraineeProgress(trainee_id);


    if(traineeProgress==null){
        return res.status(404).json({message: "can't find trainee progress"});
    }else if(traineeProgress.length===0){
        return res.status(404).json({message: "trainee doesn't have any progress reported"});
    }

    let currentDay = traineeProgress[0].day_number;


    const currentDayProgress = await getDayTraineeProgress(trainee_id,currentDay);

    const currentDayCourse = await getDaywiseCourseServices(currentDay);

    //check if the day is 22 also
    let dayProgress: number = currentDayProgress.length/currentDayCourse.length;

    if(currentDayProgress.length===currentDayCourse.length){
        currentDay++;
        dayProgress = 0;
    }

    const dayCard = [];

    //marking status of days before current day
    for(let i=1;i<currentDay;i++){
        dayCard.push({
            day_number: i,
            progress: 100,
            status: true,
            duration: "4hr 30min"
        })
    }

    dayCard.push({
        day_number: currentDay,
        progress: dayProgress*100,
        status: true,
        duration: "1hr 20min",
    })

    //marking status of days after current day
    for(let i=currentDay+1;i<=22;i++){
        dayCard.push({
            day_number: i,
            progress: 0,
            status: false,
            duration: "2hr 10min",
        })
    }

    return res.status(200).json({data: dayCard})
    

}


export default dayCardController;