import {Request, Response} from 'express';
import Courses from '../../models/courses';

const createCourse = async (req: Request, res: Response) =>{
    try{
        const {course_name,course_link, course_duration} = req.body;
        if(!course_duration || !course_name || !course_link){
            return res.status(404).json({message: 'missing body'});
        }

        const newCourse = await Courses.create({
            course_name,
            course_duration,
            course_link
        });

        return res.status(200).json({message: 'created new course'});

    }catch(error){
        return res.status(404).json({message: error});
    }
}


export default createCourse;