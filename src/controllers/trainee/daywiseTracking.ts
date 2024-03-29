import { Request,Response } from "express";
import getDaywiseCourseServices from "../../services/TraineeServices/getDaywiseCourseServices";
import getDayTraineeProgress from "../../services/TraineeServices/getDayTraineeProgress";
import daywiseCourseStatus from "../../services/TraineeServices/daywiseCourseStatus";


const daywiseTracking = async (req: Request, res: Response) => {
    const trainee_id = Number(req.params.trainee_id);
    const day_number = Number(req.params.day_number);


    if(!trainee_id || !day_number){
        return res.status(400).json({message: "Invalid trainee_id or day_number"});
    }

    

    // const courses = await getDaywiseCourseServices(day_number);

    // if(courses==null){
    //     return res.status(404).json({message: 'error getting day wise courses'});
    // }

    // const progress = await getDayTraineeProgress(trainee_id,day_number);

    // if(progress==null){
    //     return res.status(404).json({message: "error getting trainee progress"});
    // }


    // const courseProgress = await daywiseCourseStatus(courses,progress);

    // if(courseProgress.length==0){

    //     return res.status(400).json({message: 'Error fetching status of day wise courses'});

    // }


    // return res.status(200).json({message: courseProgress});

}
export default daywiseTracking;