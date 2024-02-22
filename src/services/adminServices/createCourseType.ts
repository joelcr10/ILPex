import {Request, Response} from 'express';
import Course_Type from '../../models/course_type';

const createCourseType = async (req: Request, res: Response) =>{
    try{
        const {course_type_name} = req.body;
        if(!course_type_name){
            return res.status(404).json({message: "course type name not found in body"});
        }

        await Course_Type.create({
            course_type:course_type_name,
        })

        return res.status(200).json({message: "created course type successfully"});

    }catch(error){
        return res.status(500).json({message: error})
    }
}

export default createCourseType;