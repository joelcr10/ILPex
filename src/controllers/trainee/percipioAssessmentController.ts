import { Request, Response } from "express";
import learningActivity from "../../services/percipio/learningActivity";
import percipioReportRequest from "../../services/percipio/percipioReportRequest";
import getTraineeDetails from "../../services/TraineeServices/getTraineeDetailsServices";
import getAllCourses from "../../services/adminServices/getAllCourses";
import checkTraineeProgress from "../../services/TraineeServices/checkTraineeProgress";
import createTraineeProgress from "../../services/TraineeServices/createTraineeProgress";
import createPercipioAssessment from "../../services/TraineeServices/createPercipioAssessment";
import getBatchIdByUserId from "../../services/TraineeServices/getBatchIdByUserId";
import batchDetailsServices from "../../services/l_and_d_Services/batchDetailsServices";

const percipioAssessmentController = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res
                .status(400)
                .json({ message: "invalid user_id in request body" });
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
            learningReport = await learningActivity(reportRequestId);
        }

        // console.log(learningReport);

        const traineeDetails: any = await getTraineeDetails(user_id);

        if (traineeDetails == null) {
            return res.status(404).json({ message: "Can't find the Trainee" });
        }

        console.log(traineeDetails.trainee.trainee_id);

        const trainee_id: number = traineeDetails.trainee.trainee_id;
        const batch_id: number = traineeDetails.trainee.batch_id;
        const percipio_mail: string = traineeDetails.dataValues.percipio_email;

        const courses = await getAllCourses();

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

        return res
            .status(200)
            .json({ message: "successfully added percipio assessment" });
    } catch (error) {
        return res.status(500).json({ message: "wqert" });
    }
};

export default percipioAssessmentController;
