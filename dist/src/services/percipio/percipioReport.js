"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getAllCourses_1 = tslib_1.__importDefault(require("../adminServices/getAllCourses"));
const percipioReportRequest_1 = tslib_1.__importDefault(require("./percipioReportRequest"));
const learningActivity_1 = tslib_1.__importDefault(require("./learningActivity"));
const trainee_progress_1 = tslib_1.__importDefault(require("../../models/trainee_progress"));
const checkTraineeProgress_1 = tslib_1.__importDefault(require("../TraineeServices/checkTraineeProgress"));
const percipioReport = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const reportRequestId = yield (0, percipioReportRequest_1.default)();
    const report = yield (0, learningActivity_1.default)(reportRequestId);
    const courses = yield (0, getAllCourses_1.default)();
    const userData = report.filter((item) => item.userId == 'bs.akshara@experionglobal.com' && item.status === "Completed");
    const traineeProgress = [];
    userData.map((userCourse) => {
        const courseName = userCourse.contentTitle;
        courses.map((course) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            if (courseName == course.dataValues.course_name) {
                const TrackExist = yield (0, checkTraineeProgress_1.default)(1, course.dataValues.course_id, course.dataValues.day_number);
                if (TrackExist == null) {
                    const newTrack = yield trainee_progress_1.default.create({
                        trainee_id: 1,
                        day_number: course.dataValues.day_number,
                        course_id: course.dataValues.course_id,
                        completion_status: "COMPLETED",
                    });
                    console.log("-----------> new track created");
                }
                return;
            }
        }));
    });
    console.log(traineeProgress);
});
exports.default = percipioReport;
