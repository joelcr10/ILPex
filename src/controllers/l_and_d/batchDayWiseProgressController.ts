import { Request,Response } from "express";
import findBatchDayWiseProgressService from "../../services/l_and_d_Services/batchDayWiseProgress/findBatchDayWiseProgressService";
import findBatch from "../../services/adminServices/findBatch";
import getTraineesCount from "../../services/l_and_d_Services/getTraineesCount";
import getDaywiseCourseServices from "../../services/TraineeServices/getDaywiseCourseServices";
import getWorkingDaysServices from "../../services/l_and_d_Services/getWorkingDaysServices";
import getBatchCurrentDay from "../../services/l_and_d_Services/batchDayWiseProgress/getDayCountService";

type progressData = {
    [day: string]: number; 
}
let progressData : progressData ={};
const getBatchDayWiseProgress=async(req:Request,res:Response)=>{
    try{
        let currentDate = new Date();
        const batch_id :number=parseInt(req.params.batch_id as string);

        if(!batch_id){
            return res.status(400).json({message:"Please ensure that the batch_id is provided"});
        }
        else{
            const batch_found = await findBatch(batch_id);
            if(!batch_found){
                return res.status(404).json({error : "Invalid batch_id"});
            }
            else{
                // const dateArray:Date[] = getWorkingDaysServices(batch_found.start_date,currentDate);
                // console.log("The date array",dateArray)
                // if(!dateArray){
                //     return res.status(404).json({error : "No date array"});
                // }
                // else{
                    const totalDays : any = getBatchCurrentDay(batch_id);
                    console.log("The total days are",totalDays);
                    if(totalDays){
                        const currentDay = totalDays[0];
                        console.log(currentDay);
                        const trainee_count = await getTraineesCount(batch_id);
                        console.log("The trainee count is",trainee_count);
                        for (let i=1;i <= currentDay;i++){
                            const batchDayWiseProgressCount = await findBatchDayWiseProgressService(batch_id,i);
                            console.log("batchDayWiseProgressCount",batchDayWiseProgressCount);
                            const dayWiseCourses = await getDaywiseCourseServices(i);
                            console.log("dayWiseCourses",dayWiseCourses);
                            const dayWiseCourses_count = (dayWiseCourses).length;
                            console.log("dayWiseCourses_count",dayWiseCourses_count);
                            const total_courses = trainee_count*dayWiseCourses_count;
                            console.log("total_courses",total_courses);
                            const progress:number = (batchDayWiseProgressCount/(total_courses)) * 100;
                            if(isNaN(progress)){
                                progress==0;
                            }
                            console.log("Progress is", progress);
                            progressData[i] = progress;
                        }
                    }
                else{
                    return res.status(404).json({ error : "There is some issue"})
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