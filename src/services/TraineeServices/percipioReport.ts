import axios from "axios";
import getAllCourses from "../adminServices/getAllCourses";
import percipioReportRequest from "./percipioReportRequest";
import learningActivity from "./learningActivity";
import Trainee_Progress from "../../models/trainee_progress";

const percipioReport = async() =>{

  const reportRequestId = await percipioReportRequest();
    
  
  const report = await learningActivity("14c6991d-31c2-4b86-82da-7e653a1f0306");


  const courses = await getAllCourses();


      const userData = report.filter((item:any) => item.userId=='bs.akshara@experionglobal.com' && item.status==="Completed");

      const traineeProgress:any = []
      
      console.log(userData);
      userData.map((userCourse:any) =>{
        
        const courseName = userCourse.contentTitle;
        // console.log("user data map",courseName);

        courses.map(async (course)=>{

          // console.log("course map",course.dataValues.course_name == courseName);

          if(courseName == course.dataValues.course_name){

            console.log(courseName);
            const TrackExist = await Trainee_Progress.findOne({where: {trainee_id: 1, course_id: course.dataValues.course_id, day_number: course.dataValues.day_number}});
            console.log(TrackExist);
            if(TrackExist==null){
              

              traineeProgress.push({
                trainee_id: 1,
                day_number: course.dataValues.day_number,
                course_id: course.dataValues.course_id,
                course_name: course.dataValues.course_name,
                completion_status: "COMPLETED",
              })

              console.log("match courses: ",traineeProgress);

              const newTrack = await Trainee_Progress.create({
                trainee_id: 1,
                day_number: course.dataValues.day_number,
                course_id: course.dataValues.course_id,
                completion_status: "COMPLETED",
              });

              console.log("-----------> new track created");
            }
            
            return
          }
      })

      });


      console.log(traineeProgress);

}   


export default percipioReport;