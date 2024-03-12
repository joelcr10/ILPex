import { Request,Response } from "express";
import findBatchDayWiseProgressService from "../../services/l_and_d_Services/batchDayWiseProgress/findBatchDayWiseProgressService";
import findBatch from "../../services/adminServices/findBatch";
import getTraineesCount from "../../services/l_and_d_Services/getTraineesCount";
import getDaywiseCourseServices from "../../services/TraineeServices/getDaywiseCourseServices";
import getBatchCurrentDay from "../../services/l_and_d_Services/batchDayWiseProgress/getDayCountService";

type progressData = {
    [day: string]: number; 
}

// Initialize an empty object to store progress data
let progressData : progressData ={};
const getBatchDayWiseProgress=async(req:Request,res:Response)=>{
    try{

        // Extracting batch_id from request parameters
        const batch_id :number=parseInt(req.params.batch_id as string);

        // Checking if batch_id is provided
        if(!batch_id){
            return res.status(400).json({message:"Please ensure that the batch_id is provided"});
        }
        else{

            // Finding the batch
            const batch_found = await findBatch(batch_id);
            if(!batch_found){
                return res.status(404).json({error : "Invalid batch_id"});
            }
            else{   

                    const totalDays : any = await getBatchCurrentDay(batch_id);
                    if(totalDays!=0){
                        const currentDay = totalDays[0].dataValues.day_number;

                        // Getting the count of trainees in the batch
                        const trainee_count = await getTraineesCount(batch_id);
                        for (let i=1;i <= currentDay;i++){
                            const batchDayWiseProgressCount = await findBatchDayWiseProgressService(batch_id,i);
                            const dayWiseCourses = await getDaywiseCourseServices(i);
                            const dayWiseCourses_count = (dayWiseCourses).length;
                            const total_courses = trainee_count*dayWiseCourses_count;
                            const progress:number = (batchDayWiseProgressCount/(total_courses)) * 100;
                            if(isNaN(progress)){
                                progress==0;
                            }
                            progressData[i] = progress;
                        }
                    }
                else{
                    return res.status(404).json({ error : "There is no progress for the batch"})
                }
            }
            return res.status(200).json({data : {progressData}});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
}

export default getBatchDayWiseProgress;