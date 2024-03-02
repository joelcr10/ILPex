import { Request,Response } from "express";
import getDaywiseCourseServices from "../../services/TraineeServices/getDaywiseCourseServices";
import getDayTraineeProgress from "../../services/TraineeServices/getDayTraineeProgress";

const daywiseTracking = async (req: Request, res: Response) => {
    const trainee_id = Number(req.params.trainee_id);
    const day_number = Number(req.params.day_number);

    

    const courses = await getDaywiseCourseServices(day_number);

    const progress = await getDayTraineeProgress(trainee_id,day_number);

    courses.map((course: any)=>{
        console.log(course.dataValues.course_id);
        
        progress.map((traineeCourse) =>{
            console.log(traineeCourse.dataValues);
        })
    })

    

    

    return res.status(200).json({message: "day tracking "});

}
export default daywiseTracking;