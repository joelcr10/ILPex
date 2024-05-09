import { Request, Response } from "express";
import findTraineesOfABatchServices from "../../services/l_and_d_Services/trainee_analysis/findTraineesOfABatchServices";
import findUserId from "../../services/adminServices/findUserId";
import getCourseCollectionOfABatchByBatchIDServices from "./getCourseCollectionOfABatchByBatchIDServices";
import Trainee_Progress from "../../models/trainee_progress";
import getDaywiseCourseServices from "../../services/TraineeServices/getDaywiseCourseServices";

const generateBatchReportDayWiseController = async (
  req: Request,
  res: Response
) => {
  try {
    const batch_id: number = parseInt(req.params.batch_id as string);
    const day_id: number = parseInt(req.params.day_id as string);
    if (!batch_id || !day_id) {
      return res.json({ error: "Please provide the batch_id and day_id" });
    } else {
      const coursesCollectionIdOfABatch =
        await getCourseCollectionOfABatchByBatchIDServices(batch_id);
      const coursesOfABatch = await getDaywiseCourseServices(
        day_id,
        coursesCollectionIdOfABatch.course_set_id
      );
      const trainees = await findTraineesOfABatchServices(batch_id);
      if (trainees) {
        const traineesData = [];
        for (const trainee of trainees) {
          let watched = 0;
          const user = await findUserId(trainee.user_id);
          const userName = user.user_name;
          const traineeData = {
            trainee: userName,
            courses: [],
            totalCourses: coursesOfABatch.length,
            watchedCourses: watched,
          };
          for (const course of coursesOfABatch) {
            const traineeReport = await Trainee_Progress.findOne({
              where: {
                trainee_id: trainee.trainee_id,
                course_id: course.course_id,
              },
            });
            if (traineeReport) {
              traineeData.courses.push({
                course: course.course_name,
                watchStatus: "Yes",
                duration: course.course_duration,
                watchTime: traineeReport.duration,
              });
              watched += 1;
            } else {
              traineeData.courses.push({
                course: course.course_name,
                watchStatus: "No",
                duration: course.course_duration,
                watchTime: "NA",
              });
            }
          }

          traineesData.push(traineeData);
        }
        res.status(200).json(traineesData);
      }
    }
  } catch (error) {
    console.log("Error while generating the report", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default generateBatchReportDayWiseController;
