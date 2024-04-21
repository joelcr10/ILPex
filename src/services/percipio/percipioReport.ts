import axios from "axios";
import getAllCourses from "../adminServices/getAllCourses";
import percipioReportRequest from "./percipioReportRequest";
import learningActivity from "./learningActivity";
import Trainee_Progress from "../../models/trainee_progress";
import checkTraineeProgress from "../TraineeServices/checkTraineeProgress";

const percipioReport = async () => {
    const reportRequestId = await percipioReportRequest(
        "2024-04-05T00:00:00.000Z",
        "2024-05-07T00:00:00.000Z"
    );

    const report = await learningActivity(reportRequestId);

    const courses = await getAllCourses();

    const userData = report.filter(
        (item: any) =>
            item.userId == "bs.akshara@experionglobal.com" &&
            item.status === "Completed"
    );

    const traineeProgress: any = [];

    userData.map((userCourse: any) => {
        const courseName = userCourse.contentTitle;

        courses.map(async (course) => {
            if (courseName == course.dataValues.course_name) {
                const TrackExist = await checkTraineeProgress(
                    1,
                    course.dataValues.course_id,
                    course.dataValues.day_number
                );
                if (TrackExist == null) {
                    const newTrack = await Trainee_Progress.create({
                        trainee_id: 1,
                        day_number: course.dataValues.day_number,
                        course_id: course.dataValues.course_id,
                        completion_status: "COMPLETED",
                    });

                    console.log("-----------> new track created");
                }

                return;
            }
        });
    });

    console.log(traineeProgress);
};

export default percipioReport;
