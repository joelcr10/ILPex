// joel

import {Request, Response} from 'express';
import Courses from '../../models/courses';
import Course_Type from '../../models/course_type';

const createCourse = async (req: Request, res: Response) =>{
    try{
        const {course_name,course_link, course_type_id, course_duration, day_number,course_date,createdBy} = req.body;

        if(!course_name){
            return res.status(404).json({message: "invalid course name"});
        }
        else if(!course_link){
            return res.status(404).json({message: "invalid course link"});
        }
        else if(!course_type_id){
            return res.status(404).json({message: "invalid course type id"});
        }
        else if(!course_duration){
            return res.status(404).json({message: "invalid course duration"});
        }
        else if(!day_number){
            return res.status(404).json({message: "invalid day number"});
        }
        else if(!course_date){
            return res.status(404).json({message: "invalid course date"});
        }
        else if(!createdBy){
            return res.status(404).json({message: "invalid createdBY"});
        }

        //check for course_type_id validity

        const courseType = await Course_Type.findOne({ where: {course_type_id: course_type_id}});

        if(courseType==null){
            return res.status(404).json({message: "no such course_type id exists"});
        }


        const newCourse = await Courses.create({
            course_name,
            course_duration,
            course_type_id,
            course_link,
            day_number,
            course_date,
            createdBy
        });

        if(newCourse==null){
            return res.status(400).json({message: "couldn't create table"});
        }

        return res.status(200).json({message: 'created new course'});

    }catch(error){
        return res.status(404).json({message: error});
    }
}


export default createCourse;