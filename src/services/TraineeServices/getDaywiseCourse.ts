import Course_Day_Mapping from "../../models/course_day_mapping";
import {Request, Response} from "express";
import sequelize from "../../config/sequelize-config";


const getDaywiseCourse = async (req: Request, res: Response) =>{
    try{
        const {day_id} = req.body;
        if(!day_id){
            return res.status(422).json({message: "missing body"});
        }

        const result = await sequelize.query(
            "SELECT * from course_day_mapping join courses on course_day_mapping.course_id = course.course_id"
        );
        console.log(result);
        return res.status(200).json({message: "query successfull"});
    }catch(error){
        return res.status(404).json({message: error});
    }
}


export default getDaywiseCourse;