import { Request, Response } from "express";
import findBatchByBatchIdServices from "../../services/l_and_d_Services/trainee_analysis/findBatchByBatchIdServices";
import findTraineesOfABatchServices from "../../services/l_and_d_Services/trainee_analysis/findTraineesOfABatchServices";
import findTraineeStatusServices from "../../services/l_and_d_Services/trainee_analysis/findTraineeStatusServices";
import getCourseSetIdByBatchIdServices from "../../services/l_and_d_Services/getCourseSetIdByBatchIdServices";
import getCourseCountByDayNumberAndCourseSetIdServices from "../../services/adminServices/getCourseCountByDayNumberAndCourseSetIdServices";
import findLargestDayNumberInTheCourseSetServices from "../../services/l_and_d_Services/findLargestDayNumberInTheCourseSetServices";

const batchDayWiseCourseAnalysisController = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, { message: string }>>> => {
  let onTrack = 0;
  let laggingBehind = 0;
  try {
    const batch_id: number = parseInt(req.params.batch_id as string);
    const day_id: number = parseInt(req.params.day_id as string);
    if (!batch_id || !day_id)
      return res.status(401).json({
        error: "Please ensure that the Batch ID and Day ID is Provided",
      });
    else {
      const findBatchById = await findBatchByBatchIdServices(batch_id);
      if (findBatchById) {
        //Storing the current day.

        let currentDay = day_id;
        console.log("Received Day : ", currentDay);
        const courseSetId = await getCourseSetIdByBatchIdServices(
          Number(batch_id)
        );
        const courseSetHighestDay =
          await findLargestDayNumberInTheCourseSetServices(courseSetId);
        if (courseSetHighestDay < currentDay) currentDay = courseSetHighestDay;
        console.log("Final Day ID ---> ", currentDay);

        //Find the list of all Trainees belonging to the batch with the corresponding Batch ID
        const traineesList = await findTraineesOfABatchServices(batch_id);

        if (traineesList) {
          if (Array.isArray(traineesList)) {
            //Finding the number of courses in the particular day
            // const numberOfCourses = await findNumberOfCoursesByDayNumber(currentDay);
            const numberOfCourses =
              await getCourseCountByDayNumberAndCourseSetIdServices(
                currentDay,
                courseSetId
              );
            for (const trainee of traineesList) {
              if (trainee.trainee_id !== undefined) {
                //Check if the particular Trainee has completed all the courses till the previous day of when he/she is trying to generate the report
                const findTraineeCompletionStatus =
                  await findTraineeStatusServices(
                    trainee.trainee_id,
                    currentDay
                  );
                if (findTraineeCompletionStatus >= numberOfCourses) onTrack++;
                else laggingBehind++;
              } else {
                return res
                  .status(404)
                  .json({ error: "Trainee does not exist" });
              }
            }
            return res
              .status(200)
              .json({ onTrack: onTrack, laggingBehind: laggingBehind });
          } else {
            return res.status(404).json({ error: "Trainee does not exist" });
          }
        } else {
          return res.status(404).json({ error: "Trainees Doesnt Exist" });
        }
      } else {
        return res.status(404).json({ error: "Such A Batch Doesn't Exist" });
      }
    }
  } catch (error) {
    return res.status(520).json({ error: "Unknown Error Occured : " + error });
  }
};

export default batchDayWiseCourseAnalysisController;
