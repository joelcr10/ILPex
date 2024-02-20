// import Course_Day_Mapping from "../../models/course_day_mapping";
import {Request, Response} from "express";

import Courses from "../../models/courses";
// import Days from "../../models/daysModel";



const getDaywiseCourse = async (req: Request, res: Response) =>{
    // try{
    //     const {day_id} = req.body;
    //     if(!day_id){
    //         return res.status(422).json({message: "missing body"});
    //     }

    //     Course_Day_Mapping.hasMany(Courses, {foreignKey: 'course_id'});
    //     Courses.belongsTo(Course_Day_Mapping, {foreignKey: 'course_id'});

    //     Course_Day_Mapping.hasMany(Days, {foreignKey: 'day_id'});
    //     Days.belongsTo(Course_Day_Mapping, {foreignKey: 'day_id'});
        
    //     const join: any = await Course_Day_Mapping.findAll({
    //         where: {day_id: day_id},
    //         include:[{
    //             model: Courses,
    //             attributes: ['course_name', 'course_id', 'course_link', 'course_duration'], //to get only these fields from the Courses table
    //             required: true,
    //         },{
    //             model: Days,
    //             attributes: ['day'],
    //             required: true
    //         }],
    //         attributes: ['day_id'], //to get attributes of parent table
    //         raw: true 
    //     })

    //     return res.status(200).json({message: "query successfull", view: join});

    // }catch(error){
    //     return res.status(404).json({message: error});
    // }
}


export default getDaywiseCourse;