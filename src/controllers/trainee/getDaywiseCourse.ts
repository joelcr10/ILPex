import {Request, Response} from 'express';
import getDaywiseCourse from '../../services/TraineeServices/getDaywiseCourse';


const getDaywiseCourseController = async (req: Request, res: Response) =>{
    await getDaywiseCourse(req,res);
}


export default getDaywiseCourseController;