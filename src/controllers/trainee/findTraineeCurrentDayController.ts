import { Request, Response } from 'express';
import getTraineeCurrentDay from '../../services/TraineeServices/getTraineeCurrentday';
import getTraineeCurrentDayByTraineeIdServices from '../../services/TraineeServices/getTraineeCurrentDayByTraineeIdServices';

const findTraineeCurrentDayController = async(req : Request, res : Response) => {
    try {
        const trainee_id = req.params.trainee_id;
        
        if(!trainee_id)
            return res.status(404).json({ message: "Trainee id is not defined" });
        
        const currentDay = await getTraineeCurrentDayByTraineeIdServices(Number(trainee_id));

        return res.status(200).json({ current_day: currentDay });
    } catch(error)
    {
        res.status(500).json({ error: "Internal server error" });
    }
}

export default findTraineeCurrentDayController;