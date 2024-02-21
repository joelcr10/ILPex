// import Course_Day_Mapping from "../../models/course_day_mapping";
import {Request, Response} from "express";
import Courses from "../../models/courses";
import Course_Type from "../../models/course_type";



const getDaywiseCourse = async (req: Request, res: Response) =>{
    try{
        const {day_number} = req.body;

        if(!day_number){
            return res.status(404).json({message: "day number is missing"});
        }

        const daywiseCourses = await Courses.findAll({
            where: {day_number: day_number},
            attributes: ['course_name','course_duration','course_link',],
            include: [{
                model: Course_Type,
                required: true,
                attributes: ['course_type_id', 'course_type']
            }]
            
        });

        if(daywiseCourses==null){
            return res.status(404).json({message: "couldn't find any course on that day"});
        }

        return res.status(200).json({message: daywiseCourses});
    }catch(error){
        return res.status(500).json({message: error});
    }
}


export default getDaywiseCourse;