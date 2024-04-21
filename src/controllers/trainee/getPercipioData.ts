import { Request, Response } from "express";
import percipioReportRequest from "../../services/percipio/percipioReportRequest";
import learningActivity from "../../services/percipio/learningActivity";
import getAllCourses from "../../services/adminServices/getAllCourses";
import checkTraineeProgress from "../../services/TraineeServices/checkTraineeProgress";
import createTraineeProgress from "../../services/TraineeServices/createTraineeProgress";
import getTraineeDetails from "../../services/TraineeServices/getTraineeDetailsServices";
import createPercipioAssessment from "../../services/TraineeServices/createPercipioAssessment";
import getCourseSetIdByBatchIdServices from "../../services/l_and_d_Services/getCourseSetIdByBatchIdServices";
import getAllCoursesOfABatch from "../../services/adminServices/getAllCoursesOfABatch";
import getBatchIdByUserId from "../../services/TraineeServices/getBatchIdByUserId";
import batchDetailsServices from "../../services/l_and_d_Services/batchDetailsServices";
import individualTraineeProgress from "../../services/TraineeServices/individualTraineeProgress";
import getDaywiseCourseServices from "../../services/TraineeServices/getDaywiseCourseServices";
import getDayTraineeProgress from "../../services/TraineeServices/getDayTraineeProgress";
import updateTraineeCurrentDayService from "../../services/TraineeServices/updateTraineeCurrentDayService";

const percipioReportController = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ message: "user id missing" });
        }

        const batchId = await getBatchIdByUserId(user_id);

        if (batchId === null) {
            return res
                .status(404)
                .json({ message: "No batch found for that user id" });
        }

        const batch_details = await batchDetailsServices(batchId);

        const reportRequestId = await percipioReportRequest(
            batch_details.start_date,
            batch_details.end_date
        );

        console.log(reportRequestId);

        if (reportRequestId == null) {
            return res
                .status(404)
                .json({ message: "Error fetching the report request id" });
        }

        let learningReport = await learningActivity(reportRequestId);

        if (learningReport == null) {
            return res.status(404).json({
                message:
                    "Error fetching the Learning activity report from percipio",
            });
        } else if (learningReport.status === "IN_PROGRESS") {
            // learningReport = await learningActivity(reportRequestId);

            let stopCount = 0;
            while (learningReport.status === "IN_PROGRESS") {
                learningReport = await learningActivity(reportRequestId);

                if (stopCount > 10) {
                    return res
                        .status(403)
                        .json({ message: "unable to fetch percipio report" });
                }

                stopCount++;
            }
        }

        const traineeDetails: any = await getTraineeDetails(user_id);

        if (traineeDetails == null) {
            return res.status(404).json({ message: "Can't find the Trainee" });
        }

        const trainee_id: number = traineeDetails.trainee.trainee_id;
        const batch_id: number = traineeDetails.trainee.batch_id;
        const percipio_mail: string = traineeDetails.dataValues.percipio_email;

        const courseSetId = await getCourseSetIdByBatchIdServices(batch_id);
        const courses = await getAllCoursesOfABatch(courseSetId);

        if (courses == null) {
            return res
                .status(400)
                .json({ message: "Error getting all courses" });
        }

        const userData = learningReport.filter(
            (item: any) =>
                item.userId == percipio_mail && item.status === "Completed"
        );

        userData.map((userCourse: any) => {
            const courseName = userCourse.contentTitle;

            courses.map(async (course: any) => {
                if (
                    courseName.toLowerCase() ==
                    course.dataValues.course_name.toLowerCase()
                ) {
                    const TrackExist = await checkTraineeProgress(
                        trainee_id,
                        course.dataValues.course_id,
                        course.dataValues.day_number
                    );

                    if (TrackExist == null) {
                        let duration = userCourse.duration;
                        if (userCourse.category === "Link") {
                            duration = userCourse.estimatedDuration;
                        }

                        const newTrack = await createTraineeProgress(
                            trainee_id,
                            batch_id,
                            course.dataValues.course_id,
                            course.dataValues.day_number,
                            "COMPLETED",
                            duration,
                            userCourse.estimatedDuration
                        );
                        console.log("\ncreated new track");

                        if (
                            userCourse.source === "Skillsoft" &&
                            userCourse.firstScore !== undefined
                        ) {
                            const newAssessment =
                                await createPercipioAssessment(
                                    trainee_id,
                                    batch_id,
                                    course.dataValues.course_id,
                                    course.dataValues.day_number,
                                    userCourse.firstScore,
                                    userCourse.highScore,
                                    userCourse.lastScore
                                );
                        }
                    } else if (
                        parseInt(userCourse.duration) >
                        TrackExist.dataValues.duration
                    ) {
                        await TrackExist.update({
                            duration: parseInt(userCourse.duration),
                        });
                    }

                    return;
                }
            });
        });

        const traineeCurrentDay = await getTheCurrentDay(
            trainee_id,
            courseSetId
        ); //update the current day for each trainee

        if (traineeCurrentDay == true) {
            console.log("updated the current day of", trainee_id);
        }

        return res
            .status(200)
            .json({ message: "successfully updated trainee progress" });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "internal server error" });
    }
};

const getTheCurrentDay = async (trainee_id: number, courseSetId: number) => {
    const traineeProgress = await individualTraineeProgress(trainee_id);

    if (traineeProgress == null) {
        return false;
    } else if (traineeProgress.length === 0) {
        return false;
    }

    // const dayCard = await calculateTraineeProgress(trainee_id);
    let currentDay: number = 0;
    let unlocked: boolean = true;

    for (let i = 1; i <= 22; i++) {
        currentDay = i;
        const currentDayCourses: any = await getDaywiseCourseServices(
            currentDay,
            courseSetId
        );

        let status: boolean = false;
        let dayProgress: number = 0;

        if (unlocked) {
            const currentDayProgress = await getDayTraineeProgress(
                trainee_id,
                currentDay
            );

            if (currentDayCourses.length === currentDayProgress.length) {
                dayProgress = 100;
                status = true;
            } else if (currentDayCourses.length <= currentDayProgress.length) {
                dayProgress = 100;
                status = true;
            } else {
                //update the trainee current day here
                await updateTraineeCurrentDayService(trainee_id, i);
                dayProgress =
                    (currentDayProgress.length / currentDayCourses.length) *
                    100;
                status = true;
                unlocked = false;
            }
        }

        if (i === 15) {
            i++;
        }
    }

    if (unlocked) {
        await updateTraineeCurrentDayService(trainee_id, 22);
    }

    return true;
};

export default percipioReportController;
