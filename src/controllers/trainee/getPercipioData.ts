import {Request, Response} from 'express';
import percipioReport from '../../services/percipio/percipioReport';
import percipioReportRequest from '../../services/percipio/percipioReportRequest';
import learningActivity from '../../services/percipio/learningActivity';
import getAllCourses from '../../services/adminServices/getAllCourses';
import checkTraineeProgress from '../../services/TraineeServices/checkTraineeProgress';
import createTraineeProgress from '../../services/TraineeServices/createTraineeProgress';


const percipioReportController = async (req:Request, res: Response) =>{
    try{
        // await percipioReport();

        const {trainee_id, percipio_mail} = req.body;

        console.log(trainee_id,percipio_mail);

        const reportRequestId = await percipioReportRequest();

        if(reportRequestId==null){
            return res.status(404).json({message: "Error fetching the report request id"});
        }

        

        const learningReport = await learningActivity("f001fc09-6d51-41b1-89f1-4f43de6632c2");

        console.log(learningReport);

        

        if(learningReport==null || learningReport.status==='IN_PROGRESS'){
            return res.status(404).json({message: "Error fetching the Learning activity report from percipio"});
        }

        const courses = await getAllCourses();

        if(courses==null){
           return res.status(400).json({message: "Error getting all courses"});
        }

        const userData = learningReport.filter((item:any) => item.userId==percipio_mail && item.status==="Completed");

        
        userData.map((userCourse:any) =>{
        
            const courseName = userCourse.contentTitle;
            // console.log(courseName);
    
            courses.map(async (course : any)=>{
                
              if(courseName == course.dataValues.course_name){

                // console.log("+++++++++++++++",courseName, course.dataValues.course_name, course.dataValues.course_id);
    
                const TrackExist = await checkTraineeProgress(trainee_id,course.dataValues.course_id,course.dataValues.day_number);
                
                
                if(TrackExist==null){
    
                  const newTrack = await createTraineeProgress(trainee_id,course.dataValues.course_id,course.dataValues.day_number,"COMPLETED");
    
                  console.log("-----------> new track created");
                }
                
                return
              }
          })
    
          });
    
        


        return res.status(200).json({message: 'percipio success'});
    }catch(error){
        console.log(error);
        return res.status(404).json({message: error})
    }
}

export default percipioReportController;