
import createCourse from "../../services/adminServices/createCourse";
import {Request, Response} from 'express';


const createCourseController = async (req: Request, res: Response) =>{
    await createCourse(req,res);
}


export default createCourseController;