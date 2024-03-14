import {Request, Response} from "express";
import getTraineeDetails from "../../services/TraineeServices/getTraineeDetailsServices";
import getAllCourses from "../../services/adminServices/getAllCourses";
import individualTraineeProgress from "../../services/TraineeServices/individualTraineeProgress";

const getTraineeDurationController = async(req: Request, res: Response) =>{
    try{
        const user_id = Number(req.params.user_id);

        if(!user_id){
            return res.status(400).json({message: "Invalid user_id in request param"});
        }

        const traineeDetails: any = await getTraineeDetails(user_id);
        if(traineeDetails==null){
            return res.status(404).json({message: "Can't find the Trainee"});
          }
  
          const trainee_id : number = traineeDetails.trainee.trainee_id;
          const batch_id : number = traineeDetails.trainee.batch_id;
          const percipio_mail : string = traineeDetails.dataValues.percipio_email;  
        
        const courses = await getAllCourses();

        getCourse(courses,1);
        getCourse(courses,2);

        const traineeProgress : any = await individualTraineeProgress(trainee_id);

        // console.log(traineeProgress);

        const traineeDuration : any = [];

        await Promise.all( traineeProgress?.map((item : any) =>{
            console.log(item);
            const course = getCourse(courses ,item?.course_id);
            traineeDuration.push({
                trainee_id: item.trainee_id,
                batch_id: item.batch_id,
                day_number: item.day_number,
                course_id: item.course_id,
                course_name: course.course_name,
                course_duration: item.estimated_duration,
                duration: item.duration,
            })

        }));

       
  



        return res.status(200).json({data: traineeDuration})

    }catch(error){
        return res.status(500).json({message: "Internal server error"});
    }
}


const getCourse = (courses: any,course_id : number) => {
    const course = courses.find((course : any) => course.course_id === course_id);

    return course;
}


export default getTraineeDurationController;