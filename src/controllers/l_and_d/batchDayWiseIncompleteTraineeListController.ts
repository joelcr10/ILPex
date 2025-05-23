import { Request, Response } from "express";
import getTraineesByBatchId from "../../services/l_and_d_Services/traineesByBatchIdServices";
import findCoursesInADayByCurrentDayServices from "../../services/l_and_d_Services/findCoursesInADayByCurrentDayServices";
import findCourseProgressInAParticularDayServices from "../../services/l_and_d_Services/findCourseProgressInAParticularDayServices";
import findTraineeNameByTraineeIdServices from "../../services/l_and_d_Services/findTraineeNameByTraineeIdServices";
import batchDetailsServices from "../../services/l_and_d_Services/batchDetailsServices";
import findUserId from "../../services/adminServices/findUserId";
import findUserIdByTraineeIdServices from "../../services/l_and_d_Services/findUserIdByTraineeIdServices";
import getCourseSetIdByBatchIdServices from "../../services/l_and_d_Services/getCourseSetIdByBatchIdServices";
import findLargestDayNumberInTheCourseSetServices from "../../services/l_and_d_Services/findLargestDayNumberInTheCourseSetServices";

const batchDayWiseIncompleteTraineeListController = async (
  req: Request,
  res: Response
) => {
  let incompleteTraineesList = [];
  try {
    let batch_id: number = parseInt(req.params.batch_id as string);
    let day_id: number = parseInt(req.params.day_id as string);
    console.log("Received Day : ", day_id);
    const courseSetId = await getCourseSetIdByBatchIdServices(Number(batch_id));
    const courseSetHighestDay =
      await findLargestDayNumberInTheCourseSetServices(courseSetId);
    if (courseSetHighestDay < day_id) day_id = courseSetHighestDay;
    console.log("Final Day ID ---> ", day_id);
    const findTrainees = await getTraineesByBatchId(batch_id);
    const findCoursesInADayList = await findCoursesInADayByCurrentDayServices(
      day_id,
      courseSetId
    );
    const batchName = await batchDetailsServices(batch_id);
    const courseCount = findCoursesInADayList.length;

    if (findTrainees && batchName) {
      for (const trainee of findTrainees) {
        if (trainee.trainee_id) {
          const userId = await findUserIdByTraineeIdServices(
            trainee.trainee_id
          );
          const remainingCourses = [];
          let coursesLeftCount = 0;
          const traineeDetails = await findTraineeNameByTraineeIdServices(
            trainee.trainee_id
          );
          const traineeName = traineeDetails.user_name;
          const traineeEmail = traineeDetails.email;
          const findTraineeProgress =
            await findCourseProgressInAParticularDayServices(
              trainee.trainee_id,
              day_id
            );
          const traineeCourseCount = findTraineeProgress.length;
          if (traineeCourseCount >= courseCount) continue;
          else {
            const courseIdsInDayList = findCoursesInADayList.map(
              (course) => course.dataValues.course_id
            );

            const courseIdsInProgress = findTraineeProgress.map(
              (progress) => progress.dataValues.course_id
            );

            for (const courseId of courseIdsInDayList) {
              const course = findCoursesInADayList.find(
                (course) => course.dataValues.course_id === courseId
              );

              if (!courseIdsInProgress.includes(courseId) && course) {
                coursesLeftCount = coursesLeftCount + 1;
                remainingCourses.push(course.dataValues.course_name);
              }
            }
            const traineeObject = {
              user_id: userId,
              trainee_id: trainee.trainee_id,
              batch_id: batch_id,
              day: day_id,
              user_name: traineeName,
              email: traineeEmail,
              total_courses: courseCount,
              incomplete_courses_count: coursesLeftCount,
              incomplete_courses: remainingCourses,
            };
            incompleteTraineesList.push(traineeObject);
          }
        } else {
          return res.status(404).json({ error: "Invalid Trainee ID" });
        }
      }
      return res
        .status(200)
        .json({ IncompleteTraineeList: incompleteTraineesList });
    } else {
      return res.status(404).json({ error: "No trainees exist in this batch" });
    }
  } catch (error) {
    return res.status(520).json({ error: "Unknown Error Occured : " + error });
  }
};

export default batchDayWiseIncompleteTraineeListController;
