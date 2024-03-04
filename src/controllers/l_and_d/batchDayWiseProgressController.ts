import { Request,Response } from "express";
import findBatchDayWiseProgressService from "../../services/l_and_d_Services/findBatchDayWiseProgressService";
import findBatch from "../../services/adminServices/findBatch";
import getTraineesCount from "../../services/l_and_d_Services/getTraineesCount";
import getDaywiseCourseServices from "../../services/TraineeServices/getDaywiseCourseServices";
import getWorkingDaysServices from "../../services/l_and_d_Services/getWorkingDaysServices";

const getBatchDayWiseProgress=async(req:Request,res:Response)=>{
    try{
        let currentDate = new Date();
        const batch_id :number=parseInt(req.params.batch_id as string);
        // const day_number : number =parseInt(req.params.day_id as string)

        if(!batch_id){
            return res.status(400).json({message:"Please ensure that the batch_id is provided"});
        }
        else{
            const batch_found = await findBatch(batch_id);
            if(!batch_found){
                return res.status(404).json({error : "Invalid batch_id"});
            }
            else{
                const date = getWorkingDaysServices(batch_found.start_date,currentDate);
                if(!date){
                    return res.status(404).json({error : "No date array"});
                }
                else{
                    date.forEach(date=>{
                        console.log(date);
                    })
                }
                const batchDayWiseProgressCount = await findBatchDayWiseProgressService(batch_id,5);
                if(batchDayWiseProgressCount==null){
                    return res.status(400).json({error : "The batch is either inactive or does not exist."});
                }
                else{
                    const trainee_count = await getTraineesCount(batch_id);
                    if(!trainee_count){
                        return res.status(400).json({error : "Internal Server error(No trainees)"});
                    }
                    else{
                        const dayWiseCourses = await getDaywiseCourseServices(5);
                        
                        if(!dayWiseCourses){
                            return res.status(404).json({error : "No courses found for the specified day."})
                        }
                        else{
                            const dayWiseCourses_count = (dayWiseCourses).length;
                            const total_courses = trainee_count*dayWiseCourses_count;
                            const progress:number = (batchDayWiseProgressCount/(total_courses)) * 100;
                            if(isNaN(progress)){
                                progress==0;
                            }
                                console.log("The progress is",progress);
                                return res.status(200).json({"The progress is": progress});
                        }
                    }
                }
            }
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
}

export default getBatchDayWiseProgress;