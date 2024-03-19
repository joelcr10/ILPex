"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const traineesByBatchIdServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_Services/traineesByBatchIdServices"));
const findCoursesInADayByCurrentDayServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_services/findCoursesInADayByCurrentDayServices"));
const findCourseProgressInAParticularDayServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_services/findCourseProgressInAParticularDayServices"));
const findTraineeNameByTraineeIdServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_services/findTraineeNameByTraineeIdServices"));
const batchDetailsServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_services/batchDetailsServices"));
const batchDayWiseIncompleteTraineeListController = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let incompleteTraineesList = [];
    try {
        let batch_id = parseInt(req.params.batch_id);
        let day_id = parseInt(req.params.day_id);
        const findTrainees = yield (0, traineesByBatchIdServices_1.default)(batch_id);
        const findCoursesInADayList = yield (0, findCoursesInADayByCurrentDayServices_1.default)(day_id);
        const batchName = yield (0, batchDetailsServices_1.default)(batch_id);
        const courseCount = findCoursesInADayList.length;
        if (findTrainees && batchName) {
            for (const trainee of findTrainees) {
                if (trainee.trainee_id) {
                    const remainingCourses = [];
                    let coursesLeftCount = 0;
                    console.log("Trainee ID --------> ", trainee.trainee_id);
                    const traineeName = yield (0, findTraineeNameByTraineeIdServices_1.default)(trainee.trainee_id);
                    const findTraineeProgress = yield (0, findCourseProgressInAParticularDayServices_1.default)(trainee.trainee_id, day_id);
                    const traineeCourseCount = findTraineeProgress.length;
                    if (traineeCourseCount === courseCount)
                        continue;
                    else {
                        const courseIdsInDayList = findCoursesInADayList.map(course => course.dataValues.course_id);
                        const courseIdsInProgress = findTraineeProgress.map(progress => progress.dataValues.course_id);
                        for (const courseId of courseIdsInDayList) {
                            const course = findCoursesInADayList.find(course => course.dataValues.course_id === courseId);
                            if (!courseIdsInProgress.includes(courseId) && course) {
                                coursesLeftCount = coursesLeftCount + 1;
                                remainingCourses.push(course.dataValues.course_name);
                            }
                        }
                        const traineeObject = {
                            traineeName: traineeName,
                            batchName: batchName.batch_name,
                            totalNumberOfCourses: courseCount,
                            coursesLeft: coursesLeftCount,
                            incompleteCourseList: remainingCourses
                        };
                        incompleteTraineesList.push(traineeObject);
                    }
                }
                else {
                    return res.status(404).json({ error: "Invalid Trainee ID" });
                }
            }
            return res.status(200).json({ data: incompleteTraineesList });
        }
        else {
            return res.status(404).json({ error: "No trainees exist in this batch" });
        }
    }
    catch (error) {
        return res.status(520).json({ error: "Unknown Error Occured : " + error });
    }
});
exports.default = batchDayWiseIncompleteTraineeListController;
