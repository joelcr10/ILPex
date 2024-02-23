import { Request, Response } from "express";
// import createCourseType from "../../services/adminServices/createCourseTypeServices";
import createCourseTypeServices from "../../services/adminservices/createCourseTypeServices";

const createCourseTypeController = async (req: Request, res: Response) =>{
    try{
        const {course_type_name} = req.body;
        if(!course_type_name){
            return res.status(404).json({message: "course type name not found in body"});
        }

        const newCourseType = await createCourseTypeServices(course_type_name);

        if(newCourseType==null){
            return res.status(401).json({message: "Couldn't create course type"});
        }

        return res.status(200).json({message: "created course type successfully"});

    }catch(error){
        return res.status(500).json({message: error})
    }
}

export default createCourseTypeController;