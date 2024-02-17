//created by Joel
import createDaywiseCourseMapping from "../../services/adminServices/daywiseCourseMapping";
import {Request, Response} from 'express';

const createDaywiseCourseMappingController = async(req: Request, res: Response) =>{
    await createDaywiseCourseMapping(req,res);
}


export default createDaywiseCourseMappingController;