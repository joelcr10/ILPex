import {Request, Response} from 'express';
import individualTraineeProgress from '../../services/TraineeServices/individualTraineeProgress';
import calculateTraineeProgress from '../../services/TraineeServices/calculateTraineeProgress';
import getDaywiseCourseServices from '../../services/TraineeServices/getDaywiseCourseServices';
import getDayTraineeProgress from '../../services/TraineeServices/getDayTraineeProgress';
import updateTraineeCurrentDayService from '../../services/TraineeServices/updateTraineeCurrentDayService';
import getAllBatch from '../../services/l_and_d_Services/getAllBatchesServices';
import getTraineesByBatchId from '../../services/l_and_d_Services/traineesByBatchIdServices';

 const updateCurrentDayController = async (req : Request, res : Response) =>{

    const batches = await getAllBatch(); //get all the batches


    await Promise.all(batches.map(async (item: any) => {

        const traineeList = await getTraineesByBatchId(item.batch_id); //get all the trainee from each batch

        await Promise.all(traineeList.map(async (trainee) =>{

            const traineeCurrentDay = await getTheCurrentDay(trainee.trainee_id); //update the current day for each trainee

                if(traineeCurrentDay==true){
                    console.log("updated the current day of",trainee.trainee_id);
                }

        }))
    }));


    return res.status(200).json({data: "update current day"})
    
 }


const getTheCurrentDay = async (trainee_id) =>{
    const traineeProgress = await individualTraineeProgress(trainee_id);


    if(traineeProgress==null){
        return false;
    }else if(traineeProgress.length===0){
        return false;
    }

    // const dayCard = await calculateTraineeProgress(trainee_id);
    let currentDay : number = 0;
    let unlocked : boolean = true

    // for(let i=1;i<=22;i++){
    //     currentDay = i;
    //     const currentDayCourses : any = await getDaywiseCourseServices(currentDay);

    //     let status : boolean = false;
    //     let dayProgress: number = 0;

    //     if(unlocked){
    //         const currentDayProgress = await getDayTraineeProgress(trainee_id,currentDay);

    //         if(currentDayCourses.length===currentDayProgress.length){
                
    //             dayProgress = 100;
    //             status = true;

    //         }else if(currentDayCourses.length<=currentDayProgress.length){
    //             dayProgress = 100;
    //             status = true;
    //         }
    //         else{
    //             //update the trainee current day here
    //             await updateTraineeCurrentDayService(trainee_id,i);
    //             dayProgress = (currentDayProgress.length/currentDayCourses.length) * 100;
    //             status = true;
    //             unlocked = false;
    //         }
    //     }

    //     if(i===15){
    //         i++;
    //     }

    // }

    if(unlocked){
        await updateTraineeCurrentDayService(trainee_id,22);
    }


    return true;


}




 export default updateCurrentDayController;