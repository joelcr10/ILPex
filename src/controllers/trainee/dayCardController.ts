import { Request, Response } from "express";
import individualTraineeProgress from "../../services/TraineeServices/individualTraineeProgress";
import calculateTraineeProgress from "../../services/TraineeServices/calculateTraineeProgress";
import findBatchIdByTraineeIdServices from "../../services/l_and_d_Services/findBatchIdByTraineeIdServices";
import getCourseSetIdByBatchIdServices from "../../services/l_and_d_Services/getCourseSetIdByBatchIdServices";
import getDayTraineeProgress from "../../services/TraineeServices/getDayTraineeProgress";

const dayCardController = async (req: Request, res: Response) =>{

    const trainee_id = Number(req.params.trainee_id);
    // console.log("ID------> ",trainee_id);
    const batchId = await findBatchIdByTraineeIdServices(trainee_id);
    // console.log("Batch ID :", batchId);
    const courseSetId = await getCourseSetIdByBatchIdServices(batchId);
    // console.log("Course Set ID :", courseSetId);
    const traineeProgress = await individualTraineeProgress(trainee_id);

    if(traineeProgress==null){
        return res.status(404).json({message: "can't find trainee progress"});
    }else if(traineeProgress.length===0){
        return res.status(200).json({data: []});
    }

    const dayCard = await calculateTraineeProgress(trainee_id, courseSetId);

    return res.status(200).json({data: dayCard})
    

}


export default dayCardController;