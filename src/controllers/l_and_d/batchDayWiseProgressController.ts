import { Request,Response } from "express";
import findBatchDayWiseProgressService from "../../services/l_and_d_services/batch_daywise_progress/findBatchDayWiseProgressService";
import findBatch from "../../services/adminServices/findBatch";
import getTraineesCount from "../../services/l_and_d_Services/getTraineesCount";
import getDaywiseCourseServices from "../../services/TraineeServices/getDaywiseCourseServices";
import getBatchCurrentDay from "../../services/l_and_d_services/batch_daywise_progress/getDayCountService";

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
                            //since the day 15 and day 16 has the same courses.
                            if (i === 16) {
                                continue; 
                            }
                            // getting the count of trainees who have completed the course.
                            const batchDayWiseProgressCount = await findBatchDayWiseProgressService(batch_id,i);
                            // getting the courses on each day
                            const dayWiseCourses = await getDaywiseCourseServices(i);
                            const dayWiseCourses_count = (dayWiseCourses).length;
                            // multiplying the number of courses on each day and the trainee count in each batch to get total courses.
                            const total_courses = trainee_count*dayWiseCourses_count;
                            let progress:number = (batchDayWiseProgressCount/(total_courses)) * 100;
                            if(isNaN(progress)){
                                progress=0;
                            }
                            if (progress !== null) {
                                progressData[i] = progress;
                            }
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