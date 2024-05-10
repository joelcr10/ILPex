import { Request, Response } from "express";
import findBatchByBatchIdServices from "../../services/l_and_d_Services/trainee_analysis/findBatchByBatchIdServices";
import getWorkingDaysServices from "../../services/l_and_d_Services/getWorkingDaysServices";
import moment from "moment";
import findTraineesOfABatchServices from "../../services/l_and_d_Services/trainee_analysis/findTraineesOfABatchServices";
import getCourseSetIdByBatchIdServices from "../../services/l_and_d_Services/getCourseSetIdByBatchIdServices";
import findCoursesInADayByCurrentDayServices from "../../services/l_and_d_Services/findCoursesInADayByCurrentDayServices";
import findLargestDayNumberInTheCourseSetServices from "../../services/l_and_d_Services/findLargestDayNumberInTheCourseSetServices";
import checkTraineeProgress from "../../services/TraineeServices/checkTraineeProgress";
import individualTraineeProgress from "../../services/TraineeServices/individualTraineeProgress";
import findTraineeProgressOfADay from "../../services/l_and_d_Services/findTraineeProgressOfADay";

const batchCourseAnalysisController = async (req: Request, res: Response) => {
  let onTrack = 0;
  let laggingBehind = 0;
  try {
    const batch_id: number = parseInt(req.params.batch_id as string);
    if (!batch_id)
      return res
        .status(401)
        .json({ error: "Please ensure that the Batch ID is Provided" });
    else {
      const findBatchById = await findBatchByBatchIdServices(batch_id);
      if (findBatchById) {
        const courseSetId = await getCourseSetIdByBatchIdServices(
          Number(batch_id)
        );
        //Store Batch's start date, end date and Current date
        const batchStartDate = findBatchById.start_date;
        const batchEndDate = findBatchById.end_date;
        const currentDate = new Date();
        //Converting time format
        const currentStandardDate = moment(currentDate)
          .utcOffset("+05:30")
          .format("YYYY-MM-DD");
        //Find the list of working days and store them in 'dayDateMappingList' array (Excluding Sundays)
        const dayDateMappingList = getWorkingDaysServices(
          batchStartDate,
          batchEndDate
        );
        const dayDateMappingListString: string[] = [];

        //Converting each date to string trimming the time part
        dayDateMappingList.forEach((date, index) => {
          const convertedDate = moment(date)
            .utcOffset("+05:30")
            .format("YYYY-MM-DD");
          dayDateMappingListString[index] = convertedDate;
        });

        let currentDay;

        //Handle Saturdays and Sundays
        if (dayDateMappingListString.indexOf(currentStandardDate) === -1) {
          const currentDateInDateFormat = new Date(currentStandardDate);
          const dayOfWeek = currentDateInDateFormat.getDay();
          let daysToSubtract = 0;
          if (dayOfWeek === 0) {
            daysToSubtract = 2;
          } else if (dayOfWeek === 6) {
            daysToSubtract = 1;
          }
          currentDateInDateFormat.setDate(
            currentDateInDateFormat.getDate() - daysToSubtract
          );

          const isoString = currentDateInDateFormat.toISOString();
          const dateString = isoString.substring(0, isoString.indexOf("T"));
          currentDay = dayDateMappingListString.indexOf(dateString) + 1;
        } else {
          currentDay =
            dayDateMappingListString.indexOf(currentStandardDate) + 1;
        }
        //Storing the current day
        // const currentDay = dayDateMappingListString.indexOf(currentStandardDate);
        //Find the list of all Trainees belonging to the batch with the corresponding Batch ID

        //Modify current day if batch end date is over
        if (currentDate > batchEndDate)
          currentDay = dayDateMappingListString.length;

        console.log("Received Day : ", currentDay);
        const courseSetIdFind = await getCourseSetIdByBatchIdServices(
          Number(batch_id)
        );
        const courseSetHighestDay =
          await findLargestDayNumberInTheCourseSetServices(courseSetIdFind);
        if (courseSetHighestDay < currentDay) currentDay = courseSetHighestDay;
        console.log("Final Day ID ---> ", currentDay);

        const traineesList = await findTraineesOfABatchServices(batch_id);
        if (traineesList) {
          if (Array.isArray(traineesList)) {
            //Finding the number of courses in the particular day
            // const numberOfCourses = await findNumberOfCoursesByDayNumber(currentDay);
            let numberOfCoursesArray =
              await findCoursesInADayByCurrentDayServices(
                currentDay,
                courseSetId
              );
            if (numberOfCoursesArray.length === 0) {
              numberOfCoursesArray =
                await findCoursesInADayByCurrentDayServices(
                  currentDay - 1,
                  courseSetId
                );
              currentDay = currentDay - 1;
            }
            console.log("Current day Inside Batch---> ", currentDay);
            console.log("Courses -------> ", numberOfCoursesArray);
            const numberOfCourses = numberOfCoursesArray.length;
            for (const trainee of traineesList) {
              if (trainee.trainee_id !== undefined) {
                //Check if the particular Trainee has completed all the courses till the previous day of when he/she is trying to generate the report
                console.log("Trainee ID ------> ", trainee.trainee_id);
                console.log(
                  "Trainee's Current Day -----> ",
                  trainee.current_day
                );
                if (currentDay === courseSetHighestDay) {
                  const traineeProgress = await findTraineeProgressOfADay(
                    trainee.trainee_id,
                    trainee.current_day
                  );
                  console.log("Trainee ID---> ", trainee.trainee_id);
                  console.log("Trainee current Day ---> ", trainee.current_day);
                  if (traineeProgress === numberOfCourses) onTrack++;
                  else laggingBehind++;
                } else if (trainee.current_day >= currentDay) {
                  onTrack++;
                } else laggingBehind++;
              } else {
                return res
                  .status(404)
                  .json({ error: "Trainee does not exist" });
              }
              console.log("On Track ------> ", onTrack);
              console.log("Lagging ---------> ", laggingBehind);
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

export default batchCourseAnalysisController;
