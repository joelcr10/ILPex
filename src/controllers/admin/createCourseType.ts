import { Request, Response } from "express";
import createCourseType from "../../services/adminServices/createCourseType";

const createCourseTypeController = async (req: Request, res: Response) =>{
   await createCourseType(req,res)
}

export default createCourseTypeController;