import {Request, Response} from "express";
import findTraineesOfABatchServices from "../../services/l_and_d_Services/traineeAnalysis/findTraineesOfABatchServices";
import percipioReportRequest from "../../services/percipio/percipioReportRequest";
import learningActivity from "../../services/percipio/learningActivity";
import getTraineeDetails from "../../services/TraineeServices/getTraineeDetailsServices";
import getAllCourses from "../../services/adminServices/getAllCourses";
import checkTraineeProgress from "../../services/TraineeServices/checkTraineeProgress";
import createTraineeProgress from "../../services/TraineeServices/createTraineeProgress";
import createPercipioAssessment from "../../services/TraineeServices/createPercipioAssessment";

const batchPercipioController = async (req : Request, res : Response) => {
    try{
        const {batch_id} = req.body;
        
        console.log("what is happening");
        if(!batch_id){
            return res.status(402).json({message: "batch_id is missing in body"});
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

        const batchDetails : any = await findTraineesOfABatchServices(batch_id);


        const traineeList : any = [];

        await Promise.all(batchDetails.map(async (item: any) => {
        
            const traineeDetails: any = await getTraineeDetails(item.user_id);
        
            traineeList.push({
                trainee_id: item.trainee_id,
                batch_id: item.batch_id,
                percipio_mail: traineeDetails.dataValues.percipio_email
            });
        
          
        }));


       

        const courses = await getAllCourses();

        if(courses==null){
           return res.status(400).json({message: "Error getting all courses"});
        }


        await Promise.all(traineeList.map( async(student: any) =>{

            const userData = learningReport.filter((item:any) => item.userId==student.percipio_mail && item.status==="Completed");

        
            userData.map((userCourse:any) =>{
            
                const courseName = userCourse.contentTitle;
    
                courses.map(async (course : any)=>{
                    
                  if(courseName.toLowerCase() == course.dataValues.course_name.toLowerCase()){
    
                    const TrackExist = await checkTraineeProgress(student.trainee_id,course.dataValues.course_id,course.dataValues.day_number);
                    
                    
                    if(TrackExist==null){

                        let duration = userCourse.duration;
                        if(userCourse.category==="Link"){
                          duration = userCourse.estimatedDuration;
                        }
        
                      const newTrack = await createTraineeProgress(student.trainee_id, student.batch_id ,course.dataValues.course_id,course.dataValues.day_number,"COMPLETED",duration,userCourse.estimatedDuration);
                      console.log("created new track");

                      if(userCourse.source === "Skillsoft" && userCourse.firstScore!== undefined){
                        const newAssessment = await createPercipioAssessment(student.trainee_id, student.batch_id ,course.dataValues.course_id,course.dataValues.day_number,userCourse.firstScore, userCourse.highScore, userCourse.lastScore);
    
                      }
                    }
                    
                    return
                  }
              })
        
              });
        
            
        }))


        return res.status(200).json({message: "Successfully added batch report"});

    }catch(error){
        console.log(error);
        return res.status(500).json({ërror : "ïnternal server error"});
    }
}


export default batchPercipioController;