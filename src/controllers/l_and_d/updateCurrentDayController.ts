import {Request, Response} from 'express';
import individualTraineeProgress from '../../services/TraineeServices/individualTraineeProgress';
import calculateTraineeProgress from '../../services/TraineeServices/calculateTraineeProgress';
import getDaywiseCourseServices from '../../services/TraineeServices/getDaywiseCourseServices';
import getDayTraineeProgress from '../../services/TraineeServices/getDayTraineeProgress';
import updateTraineeCurrentDayService from '../../services/TraineeServices/updateTraineeCurrentDayService';

 const updateCurrentDayController = async (req : Request, res : Response) =>{
    console.log("inside update current day controller-------------------------------------")
    const {trainee_id} = req.body;

    // const trainee_id = Number(req.params.trainee_id);
    
    const traineeProgress = await individualTraineeProgress(trainee_id);


    if(traineeProgress==null){
        return res.status(404).json({message: "can't find trainee progress"});
    }else if(traineeProgress.length===0){
        return res.status(404).json({message: "trainee doesn't have any progress reported"});
    }

    // const dayCard = await calculateTraineeProgress(trainee_id);

    let dayCard : any[] = [];
    let currentDay : number = 0;
    let unlocked : boolean = true

    for(let i=1;i<=22;i++){
        currentDay = i;
        const currentDayCourses : any = await getDaywiseCourseServices(currentDay);

        let status : boolean = false;
        let dayProgress: number = 0;

        if(unlocked){
            const currentDayProgress = await getDayTraineeProgress(trainee_id,currentDay);

            if(currentDayCourses.length===currentDayProgress.length){
                
                dayProgress = 100;
                status = true;

            }else if(currentDayCourses.length<=currentDayProgress.length){
                dayProgress = 100;
                status = true;
            }
            else{
                //update the trainee current day here
                await updateTraineeCurrentDayService(trainee_id,i);
                dayProgress = (currentDayProgress.length/currentDayCourses.length) * 100;
                status = true;
                unlocked = false;
            }
        }

        const duration: string = getCourseDuration(currentDayCourses);
        dayCard.push({
            day_number: i,
            progress: dayProgress,
            status: status,
            duration: duration
        })

        if(i===15){
            i++;
        }

    }

    


    return res.status(200).json({data: dayCard})



    return res.status(200).json("working fine");
    
 }


 const getCourseDuration = (currentDayCourses : any[]) =>{
    let duration : number = 0;
    currentDayCourses.map((item: any) => {
        let itemDuration : string = item.course_duration;
        
        let matchResult = itemDuration.match(/((\d+)h)?\s*((\d+)m)?\s*((\d+)s)?/);
        if (matchResult) {
            var hours : number = matchResult[2] ? parseInt(matchResult[2], 10) : 0; // Convert the matched hours to an integer
            var minutes : number = matchResult[4] ? parseInt(matchResult[4], 10) : 0; // Convert the matched minutes to an integer
            var seconds : number = matchResult[6] ? parseInt(matchResult[6], 10) : 0; // Convert the matched seconds to an integer

            duration = duration + (hours*60*60) + (minutes*60) + seconds; //converting everything to seconds

          } else {
            console.log("No match found");
          }

    })

    var hours : number = Math.floor(duration / 3600); // Get the whole hours
    var minutes : number = Math.floor((duration % 3600) / 60); // Get the whole minutes

    if(minutes===0){
        return hours+"h";
    }

    if(hours===0){
        return minutes+"m"
    }
    return hours+"h "+minutes+"m";
}



 export default updateCurrentDayController;