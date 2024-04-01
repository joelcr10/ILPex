//Daywise Incomplete Trainees List
import {Request, Response} from 'express';
import getTraineesByBatchId from '../../services/l_and_d_Services/traineesByBatchIdServices';
import getCourseCountByDayNumber from '../../services/l_and_d_Services/courseCountByDayNumberServices';
import checkTraineeProgress from '../../services/l_and_d_Services/dayWiseIncompleteTraineesServices';
import getBatchService from '../../services/TraineeServices/assessmentServices/getBatchService';
import getDaywiseIncompleteTraineeNames from '../../services/l_and_d_Services/daywiseIncompleteTraineeNamesService';
import getCourseSetIdByBatchIdServices from '../../services/l_and_d_Services/getCourseSetIdByBatchIdServices';
import getCourseCountByDayNumberAndCourseSetIdServices from '../../services/adminServices/getCourseCountByDayNumberAndCourseSetIdServices';


const getIncompleteTraineeList = async (req: Request, res: Response) =>{
    try{
        const day = req.params.id;
        const batchid=req.params.batch_id;

        if (!day) {
          return res.status(404).json({ message: "Day Number not defined" });
        }
        if (!batchid) {
            return res.status(404).json({ message: "Batch Id not defined" });
          }
        const dayNumber = parseInt(day as string);
        const batch_id = parseInt(batchid as string);
        const batch= await getBatchService(batch_id);
            // Find trainee by user_id
        const traineeList = await getTraineesByBatchId(batch_id);
        
        const courseSetId = await getCourseSetIdByBatchIdServices(Number(batch_id));

        if (!traineeList) {
          return res.status(404).json({error: "This batch has no trainees "});
        } else {

            // const courseCount=await getCourseCountByDayNumber(dayNumber);
            const courseCount = await getCourseCountByDayNumberAndCourseSetIdServices(dayNumber, courseSetId);
            if(!courseCount){
                return res.status(404).json({error: "No courses assigned to the given day number"});
            }
            else{
                const incompleteTraineeList=await checkTraineeProgress(traineeList,dayNumber,courseCount);
                if(!incompleteTraineeList){
                    return res.status(404).json({ error: "Every trainee in this batch has completed this day's courses" });
        
                }
                else{
                    const traineeIds: number[] | any[] = incompleteTraineeList.map((trainee) => trainee.trainee_id);

                    if (Array.isArray(traineeIds) && traineeIds.length > 0) {
                      // Get trainee names based on trainee IDs
                      const traineeNames = await getDaywiseIncompleteTraineeNames(traineeIds,Number(day), courseSetId);
                    
                      const incompleteTraineeListWithBatch = traineeNames.map((traineeName) => ({
                        user_id:traineeName.user_id,
                        trainee_id: traineeName.trainee_id,
                        Batch: batch?.batch_name,
                        user_name: traineeName.user_name,
                        email:traineeName.email,
                        total_courses:traineeName.totalCourses,
                        incomplete_courses:traineeName.incompleteCoursesCount,
                        incomplete_courses_list:traineeName.incompleteCourseNames
                      }));
                    
                      return res.status(200).json({ IncompleteTraineeList: incompleteTraineeListWithBatch });
                    } else {
                      return res.status(404).json({ error: "No incomplete trainees found" });
                    }
                }
            }
        
        }

      }catch(error){
        
        return res.status(500).json({message: error});
    }
}


export default getIncompleteTraineeList;