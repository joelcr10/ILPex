import {Request, Response} from 'express';
import getTraineesByBatchId from '../../services/l_and_d_Services/traineesByBatchIdServices';
import getCourseCountByDayNumber from '../../services/l_and_d_Services/courseCountByDayNumberServices';
import checkTraineeProgress from '../../services/l_and_d_Services/dayWisecompleteTraineesServices';
import getBatchService from '../../services/TraineeServices/assessmentServices/getBatchService';
import getCompleteTraineeNames from '../../services/l_and_d_Services/completeTraineeNamesService';




const getCompleteTraineeList = async (req: Request, res: Response) =>{
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

        // Find trainees that belong to the same batch.
        const traineeList = await getTraineesByBatchId(batch_id);
    

    if (!traineeList) {
      return res.status(404).json({error: "This batch has no trainees"});
    } else {
        const courseCount=await getCourseCountByDayNumber(dayNumber);
        if(!courseCount){
            return res.status(404).json({error: "No courses assigned to the given day number"});

        }
        else{
            const completeTraineeList=await checkTraineeProgress(traineeList,dayNumber,courseCount);
            if(!completeTraineeList){
                return res.status(404).json({ error: "Every trainee in this batch has completed this day's courses" });
    
            }
            else{
                const traineeIds: number[] | any[] = completeTraineeList.map((trainee) => trainee.trainee_id);

                if (Array.isArray(traineeIds) && traineeIds.length > 0) {
                  // Get trainee names based on trainee IDs
                  const traineeNames = await getCompleteTraineeNames(traineeIds);
                
                  const completeTraineeListWithBatch = traineeNames.map((traineeName) => ({
                    user_id:traineeName.user_id,
                    trainee_id: traineeName.trainee_id,
                    Batch: batch?.batch_name,
                    user_name: traineeName.user_name,
  
                  }));
                
                  return res.status(200).json({ CompleteTraineeList: completeTraineeListWithBatch });
                } else {
                  return res.status(404).json({ error: "No complete trainees found" });
                }
      
                

            }
            

        }
        
    }

   



    }catch(error){
        
        return res.status(500).json({message: error});
    }
}


export default getCompleteTraineeList;