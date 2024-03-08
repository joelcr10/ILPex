import {Request, Response} from 'express';

import percipioReportRequest from '../../services/percipio/percipioReportRequest';
import learningActivity from '../../services/percipio/learningActivity';
import getAllCourses from '../../services/adminServices/getAllCourses';
import checkTraineeProgress from '../../services/TraineeServices/checkTraineeProgress';
import createTraineeProgress from '../../services/TraineeServices/createTraineeProgress';
import getTraineeDetails from '../../services/TraineeServices/getTraineeDetailsServices';



const percipioReportController = async (req:Request, res: Response) =>{
    try{

        const {user_id} = req.body;

        if(!user_id){
          return res.status(400).json({message: "user id missing"});
        }

        const reportRequestId = await percipioReportRequest();

        if(reportRequestId==null){
            return res.status(404).json({message: "Error fetching the report request id"});
        }

        

        let learningReport = await learningActivity(reportRequestId);    

        if(learningReport==null){

            return res.status(404).json({message: "Error fetching the Learning activity report from percipio"});

        }else if(learningReport.status === 'IN_PROGRESS'){
          
          learningReport = await learningActivity(reportRequestId);
        }

        const traineeDetails: any = await getTraineeDetails(user_id);

        if(traineeDetails==null){
          return res.status(404).json({message: "Can't find the Trainee"});
        }

        const trainee_id : number = traineeDetails.trainee_id;
        const batch_id : number = traineeDetails.batch_id;
        const percipio_mail : string = traineeDetails.dataValues.user.percipio_email;    

        const courses = await getAllCourses();

        if(courses==null){
           return res.status(400).json({message: "Error getting all courses"});
        }

        const userData = learningReport.filter((item:any) => item.userId==percipio_mail && item.status==="Completed");

        
        userData.map((userCourse:any) =>{
        
            const courseName = userCourse.contentTitle;

            courses.map(async (course : any)=>{
                
              if(courseName == course.dataValues.course_name){

                const TrackExist = await checkTraineeProgress(trainee_id,course.dataValues.course_id,course.dataValues.day_number);
                
                
                if(TrackExist==null){
    
                  const newTrack = await createTraineeProgress(trainee_id, batch_id ,course.dataValues.course_id,course.dataValues.day_number,"COMPLETED");
                  console.log("created new track");
                }
                
                return
              }
          })
    
          });
    
        


        return res.status(200).json({message: 'successfully updated trainee progress'});
    }catch(error){
        console.log(error);
        return res.status(404).json({message: error})
    }
}

export default percipioReportController;