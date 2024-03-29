import {Request, Response} from 'express';
import getDaywiseCourseServices from '../../services/TraineeServices/getDaywiseCourseServices';
import getCourseSetIdByBatchIdServices from '../../services/l_and_d_Services/getCourseSetIdByBatchIdServices';


const getDaywiseCourseController = async (req: Request, res: Response) =>{
    try{
        const day_number = Number(req.params.id);
        const batch_id = Number(req.params.batch_id);
        const courseSetId = await getCourseSetIdByBatchIdServices(batch_id);
        if(!day_number){
            return res.status(400).json({message: "day number is missing"});
        }

        const result = await getDaywiseCourseServices(Number(day_number), courseSetId);
        
        if(result.length==0){
            return res.status(404).json({message: "couldn't find any course on that day"});
        }


        return res.status(200).json({message: result});

    }catch(error){
        
        return res.status(500).json({message: 'Internal server error'});
    }
}


export default getDaywiseCourseController;