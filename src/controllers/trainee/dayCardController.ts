import { Request, Response } from "express";
import individualTraineeProgress from "../../services/TraineeServices/individualTraineeProgress";
import calculateTraineeProgress from "../../services/TraineeServices/calculateTraineeProgress";

const dayCardController = async (req: Request, res: Response) =>{

    const trainee_id = Number(req.params.trainee_id);
    
    const traineeProgress = await individualTraineeProgress(trainee_id);


    if(traineeProgress==null){
        return res.status(404).json({message: "can't find trainee progress"});
    }else if(traineeProgress.length===0){
        return res.status(404).json({message: "trainee doesn't have any progress reported"});
    }

    const dayCard = await calculateTraineeProgress(trainee_id);


    return res.status(200).json({data: dayCard})
    

}


export default dayCardController;