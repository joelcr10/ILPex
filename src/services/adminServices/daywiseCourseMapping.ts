//created by Joel
import {Request, Response} from 'express';
// import Course_Day_Mapping from '../../models/course_day_mapping';

const createDaywiseCourseMapping = async (req: Request, res: Response) =>{
    try{
        const {course_id, day_id} = req.body;
        if(!course_id || !day_id){
            return res.status(404).json({message: "missing body"});
        }

        // const newMapping = await Course_Day_Mapping.create({
        //     course_id,
        //     day_id
        // })

        return res.status(200).json({message: "mapping created"});

    }catch(error){
        return res.status(404).json({message: error});
    }
}


export default createDaywiseCourseMapping;