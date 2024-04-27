import { Request, Response } from "express";
import findBatchIdByTraineeIdServices from "../../services/l_and_d_Services/findBatchIdByTraineeIdServices";
import getCourseSetIdByBatchIdServices from "../../services/l_and_d_Services/getCourseSetIdByBatchIdServices";
import calculateTraineeStatus from "../../services/TraineeServices/calculateTraineeStatus";

const traineeAllDayController = async (req: Request, res: Response) => {
    const trainee_id = Number(req.params.trainee_id);
    if(!trainee_id){
        return res.status(400).json({message: "request body missing trainee_id"});
    }

    const batchId = await findBatchIdByTraineeIdServices(trainee_id);

    if(batchId === null){
        return res.status(404).json({message: "batch not found"});
    }

    const courseSetId = await getCourseSetIdByBatchIdServices(batchId);

    if(courseSetId === null){
        return res.status(404).json({message: "course set not found"});
    }

    const dayCard = await calculateTraineeStatus(trainee_id, courseSetId);

    return res.status(200).json({ data: dayCard });
};

export default traineeAllDayController;
