import findTraineesOfABatchServices from "../src/services/l_and_d_Services/trainee_analysis/findTraineesOfABatchServices";
import percipioReportRequest from "../src/services/percipio/percipioReportRequest";
import learningActivity from "../src/services/percipio/learningActivity";
import getTraineeDetails from "../src/services/TraineeServices/getTraineeDetailsServices";
import checkTraineeProgress from "../src/services/TraineeServices/checkTraineeProgress";
import createTraineeProgress from "../src/services/TraineeServices/createTraineeProgress";
import createPercipioAssessment from "../src/services/TraineeServices/createPercipioAssessment";
import getCourseSetIdByBatchIdServices from "../src/services/l_and_d_Services/getCourseSetIdByBatchIdServices";
import getAllCoursesOfABatch from "../src/services/adminServices/getAllCoursesOfABatch";
import getAllBatch from "../src/services/l_and_d_Services/getAllBatchesServices";
import getTraineesByBatchId from "../src/services/l_and_d_Services/traineesByBatchIdServices";
import individualTraineeProgress from "../src/services/TraineeServices/individualTraineeProgress";
import getDaywiseCourseServices from "../src/services/TraineeServices/getDaywiseCourseServices";
import getDayTraineeProgress from "../src/services/TraineeServices/getDayTraineeProgress";
import updateTraineeCurrentDayService from "../src/services/TraineeServices/updateTraineeCurrentDayService";
import batchDetailsServices from "../src/services/l_and_d_Services/batchDetailsServices";

const batchPercipio = async () => {
    try {
        

        const batches = await getAllBatch(); //get all the batches

        if (batches === null || batches === undefined) {
            return "no batches found";
        }

        await Promise.all(
            batches.map(async (item: any) => {
                let batch_id = item.batch_id;

                const courseSetId = await getCourseSetIdByBatchIdServices(
                    batch_id
                );
                const batchDetails: any = await findTraineesOfABatchServices(
                    batch_id
                );

                const batch_details = await batchDetailsServices(batch_id);
                const reportRequestId = await percipioReportRequest(
                    batch_details.start_date,
                    batch_details.end_date
                );

                if (reportRequestId == null) {
                    return "Error fetching the report request id";
                }

                let learningReport = await learningActivity(reportRequestId);
                
                if (learningReport == null) {
                    return "Error fetching the Learning activity report from percipio";
                } else if (learningReport.status === "IN_PROGRESS" || learningReport.status === "PENDING") {
                    let stopCount = 0;
                    while (learningReport.status === "IN_PROGRESS" || learningReport.status === "PENDING") {
                        learningReport = await learningActivity(
                            reportRequestId
                        );

                        if (stopCount > 10) {
                            return "unable to fetch percipio report";
                        }

                        stopCount++;
                    }
                }

                const traineeList: any = [];

                await Promise.all(
                    batchDetails.map(async (item: any) => {
                        const traineeDetails: any = await getTraineeDetails(
                            item.user_id
                        );

                        traineeList.push({
                            trainee_id: item.trainee_id,
                            batch_id: item.batch_id,
                            percipio_mail:
                                traineeDetails.dataValues.percipio_email,
                        });
                    })
                );

                const courses = await getAllCoursesOfABatch(courseSetId);

                if (courses == null) {
                    return "Error getting all courses";
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
                                    const TrackExist =
                                        await checkTraineeProgress(
                                            student.trainee_id,
                                            course.dataValues.course_id,
                                            course.dataValues.day_number
                                        );

                                    if (TrackExist == null) {
                                        let duration = userCourse.duration;
                                        if (userCourse.category === "Link") {
                                            duration =
                                                userCourse.estimatedDuration;
                                        }

                                        const newTrack =
                                            await createTraineeProgress(
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
                                                    course.dataValues
                                                        .day_number,
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
                                            duration: parseInt(
                                                userCourse.duration
                                            ),
                                        });
                                    }

                                    return;
                                }
                            });
                        });
                    })
                );
            })
        );

        return "Successfully added batch report";
    } catch (error) {
        console.log(error);
        return "ïnternal server error";
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

const updateCurrentDay = async () => {
    const batches = await getAllBatch(); //get all the batches

    await Promise.all(
        batches.map(async (item: any) => {
            const traineeList = await getTraineesByBatchId(item.batch_id); //get all the trainee from each batch

            const courseSetId = await getCourseSetIdByBatchIdServices(
                item.batch_id
            );
            await Promise.all(
                traineeList.map(async (trainee) => {
                    const traineeCurrentDay = await getTheCurrentDay(
                        trainee.trainee_id,
                        courseSetId
                    ); //update the current day for each trainee

                    if (traineeCurrentDay == true) {
                        console.log(
                            "updated the current day of",
                            trainee.trainee_id
                        );
                    }
                })
            );
        })
    );

    return "updated current day";
};

const getTheCurrentDay = async (trainee_id: number, courseSetId: number) => {
    const traineeProgress = await individualTraineeProgress(trainee_id);

    if (traineeProgress == null) {
        return false;
    } else if (traineeProgress.length === 0) {
        return false;
    }

    const courses = await getAllCoursesOfABatch(courseSetId);
    const highestDayNumber = findHighestDayNumber(courses);

    // const dayCard = await calculateTraineeProgress(trainee_id);
    let currentDay: number = 0;
    let unlocked: boolean = true;

    for (let i = 1; i <= highestDayNumber; i++) {
        currentDay = i;
        const currentDayCourses: any = await getDaywiseCourseServices(
            currentDay,
            courseSetId
        );

        if (currentDayCourses === null || currentDayCourses === undefined) {
            console.log("$$$$$$$: skipped", currentDay);
            continue;
        }

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

        // if(i===15){
        //     i++;
        // }
    }

    if (unlocked) {
        await updateTraineeCurrentDayService(trainee_id, 22);
    }

    return true;
};

const testRun = async () => {
    const batchReport = await batchPercipio();
    const updateDayReport = await updateCurrentDay();
    console.log("Updated Everything", batchReport, updateDayReport);
};

export default testRun();
