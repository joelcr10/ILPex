
import {Request, Response} from 'express';
// import getCourseTypeServices from "../../services/adminservices/getCourseTypeServices";
import getCourseTypeServices from '../../services/adminServices/getCourseTypeServices';
// import createCourseServices from "../../services/adminservices/createCourseServices";
import createCourseServices from '../../services/adminServices/createCourseServices';


const createCourseController = async (req: Request, res: Response) =>{
    try{
        const {course_name, course_type, course_duration, day_number,createdBy} = req.body;

        if(!course_name){
            return res.status(404).json({message: "invalid course name"});
        }
        // else if(!course_link){
        //     return res.status(404).json({message: "invalid course link"});
        // }
        // else if(!course_type_id){
        //     return res.status(404).json({message: "invalid course type id"});
        // }
        else if(!course_duration){
            return res.status(404).json({message: "invalid course duration"});
        }
        else if(!day_number){
            return res.status(404).json({message: "invalid day number"});
        }
        // else if(!course_date){
        //     return res.status(404).json({message: "invalid course date"});
        // }
        else if(!createdBy){
            return res.status(404).json({message: "invalid createdBY"});
        }

        // const courseType = await getCourseTypeServices(course_type_id);

        // if(courseType==null){
        //     return res.status(404).json({message: "no such course_type id exists"});
        // }

        const newCourse = await createCourseServices(course_name, course_duration, course_type, day_number, createdBy);

        if(newCourse==null){
            return res.status(400).json({message: "couldn't create table"});
        }

        return res.status(200).json({message: 'created new course'});

    }catch(error){
        return res.status(404).json({message: error});
    }
}


export default createCourseController;