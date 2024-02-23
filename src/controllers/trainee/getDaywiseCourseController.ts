import {Request, Response} from 'express';
import getDaywiseCourseServices from '../../services/traineeservices/getDaywiseCourseServices';


const getDaywiseCourseController = async (req: Request, res: Response) =>{
    try{
        const {day_number} = req.body;

        if(!day_number){
            return res.status(404).json({message: "day number is missing"});
        }

        const result = await getDaywiseCourseServices(day_number);
        
        if(result.length==0){
            return res.status(404).json({message: "couldn't find any course on that day"});
        }


        return res.status(200).json({message: result});

    }catch(error){
        
        return res.status(500).json({message: error});
    }
}


export default getDaywiseCourseController;