import { Request, Response } from "express";
import findTraineesOfABatchServices from "../../services/l_and_d_Services/trainee_analysis/findTraineesOfABatchServices";
import percipioReportRequest from "../../services/percipio/percipioReportRequest";
import learningActivity from "../../services/percipio/learningActivity";
import getTraineeDetails from "../../services/TraineeServices/getTraineeDetailsServices";
import checkTraineeProgress from "../../services/TraineeServices/checkTraineeProgress";
import createTraineeProgress from "../../services/TraineeServices/createTraineeProgress";
import createPercipioAssessment from "../../services/TraineeServices/createPercipioAssessment";
import getCourseSetIdByBatchIdServices from "../../services/l_and_d_Services/getCourseSetIdByBatchIdServices";
import getAllCoursesOfABatch from "../../services/adminServices/getAllCoursesOfABatch";
import batchDetailsServices from "../../services/l_and_d_Services/batchDetailsServices";
import updateTraineeCurrentDayService from "../../services/TraineeServices/updateTraineeCurrentDayService";
import getDayTraineeProgress from "../../services/TraineeServices/getDayTraineeProgress";
import getDaywiseCourseServices from "../../services/TraineeServices/getDaywiseCourseServices";
import individualTraineeProgress from "../../services/TraineeServices/individualTraineeProgress";

const batchPercipioController = async (req: Request, res: Response) => {
    try {
        const { batch_id } = req.body;
        if (!batch_id) {
            return res
                .status(402)
                .json({ message: "batch_id is missing in body" });
        }

        const batch_details = await batchDetailsServices(batch_id);

        const reportRequestId = await percipioReportRequest(
            batch_details.start_date,
            batch_details.end_date
        );

        const courseSetId = await getCourseSetIdByBatchIdServices(batch_id);

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

        const batchDetails: any = await findTraineesOfABatchServices(batch_id);

        const traineeList: any = [];

        await Promise.all(
            batchDetails.map(async (item: any) => {
                const traineeDetails: any = await getTraineeDetails(
                    item.user_id
                );

                traineeList.push({
                    trainee_id: item.trainee_id,
                    batch_id: item.batch_id,
                    percipio_mail: traineeDetails.dataValues.percipio_email,
                });
            })
        );

        const courses = await getAllCoursesOfABatch(courseSetId);

        const highestDayNumber = findHighestDayNumber(courses);

        if (courses == null) {
            return res
                .status(400)
                .json({ message: "Error getting all courses" });
        }

        await Promise.all(
            traineeList.map(async (student: any) => {
                const userData = learningReport.filter(
                    (item: any) =>
                        item.userId == student.percipio_mail &&
                        item.status === "Completed"
                );

                userData.map((userCourse: any) => {
                    const courseName = userCourse.contentTitle;

                    courses.map(async (course: any) => {
                        if (
                            courseName.toLowerCase() ==
                            course.dataValues.course_name.toLowerCase()
                        ) {
                            const TrackExist = await checkTraineeProgress(
                                student.trainee_id,
                                course.dataValues.course_id,
                                course.dataValues.day_number
                            );

                            if (TrackExist == null) {
                                let duration = userCourse.duration;
                                if (userCourse.category === "Link") {
                                    duration = userCourse.estimatedDuration;
                                }

                                const newTrack = await createTraineeProgress(
                                    student.trainee_id,
                                    student.batch_id,
                                    course.dataValues.course_id,
                                    course.dataValues.day_number,
                                    "COMPLETED",
                                    duration,
                                    userCourse.estimatedDuration
                                );
                                console.log("created new track");

                                if (
                                    userCourse.source === "Skillsoft" &&
                                    userCourse.firstScore !== undefined
                                ) {
                                    const newAssessment =
                                        await createPercipioAssessment(
                                            student.trainee_id,
                                            student.batch_id,
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
                    student.trainee_id,
                    courseSetId
                ); //update the current day for each trainee

                if (traineeCurrentDay == true) {
                    console.log(
                        "updated the current day of",
                        student.trainee_id
                    );
                }
            })
        );

        console.log("successfully update batch report");
        return res
            .status(200)
            .json({ message: "Successfully added batch report" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ërror: "ïnternal server error" });
    }
};

function findHighestDayNumber(courses) {
    let highestDayNumber = -Infinity;

    for (let course of courses) {
        if (course.day_number > highestDayNumber) {
            highestDayNumber = course.day_number;
        }
    }

    return highestDayNumber;
}

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

export default batchPercipioController;
