"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const learningActivity_1 = tslib_1.__importDefault(require("../../services/percipio/learningActivity"));
const percipioReportRequest_1 = tslib_1.__importDefault(require("../../services/percipio/percipioReportRequest"));
const getTraineeDetailsServices_1 = tslib_1.__importDefault(require("../../services/TraineeServices/getTraineeDetailsServices"));
const getAllCourses_1 = tslib_1.__importDefault(require("../../services/adminServices/getAllCourses"));
const checkTraineeProgress_1 = tslib_1.__importDefault(require("../../services/TraineeServices/checkTraineeProgress"));
const createTraineeProgress_1 = tslib_1.__importDefault(require("../../services/TraineeServices/createTraineeProgress"));
const createPercipioAssessment_1 = tslib_1.__importDefault(require("../../services/TraineeServices/createPercipioAssessment"));
const percipioAssessmentController = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({ message: "invalid user_id in request body" });
        }
        const reportRequestId = yield (0, percipioReportRequest_1.default)();
        if (reportRequestId == null) {
            return res.status(404).json({ message: "Error fetching the report request id" });
        }
        let learningReport = yield (0, learningActivity_1.default)(reportRequestId);
        if (learningReport == null) {
            return res.status(404).json({ message: "Error fetching the Learning activity report from percipio" });
        }
        else if (learningReport.status === 'IN_PROGRESS') {
            learningReport = yield (0, learningActivity_1.default)(reportRequestId);
        }
        // console.log(learningReport);
        const traineeDetails = yield (0, getTraineeDetailsServices_1.default)(user_id);
        if (traineeDetails == null) {
            return res.status(404).json({ message: "Can't find the Trainee" });
        }
        console.log(traineeDetails.trainee.trainee_id);
        const trainee_id = traineeDetails.trainee.trainee_id;
        const batch_id = traineeDetails.trainee.batch_id;
        const percipio_mail = traineeDetails.dataValues.percipio_email;
        const courses = yield (0, getAllCourses_1.default)();
        if (courses == null) {
            return res.status(400).json({ message: "Error getting all courses" });
        }
        const userData = learningReport.filter((item) => item.userId == percipio_mail && item.status === "Completed");
        userData.map((userCourse) => {
            const courseName = userCourse.contentTitle;
            courses.map((course) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                if (courseName.toLowerCase() == course.dataValues.course_name.toLowerCase()) {
                    const TrackExist = yield (0, checkTraineeProgress_1.default)(trainee_id, course.dataValues.course_id, course.dataValues.day_number);
                    if (TrackExist == null) {
                        let duration = userCourse.duration;
                        if (userCourse.category === "Link") {
                            duration = userCourse.estimatedDuration;
                        }
                        const newTrack = yield (0, createTraineeProgress_1.default)(trainee_id, batch_id, course.dataValues.course_id, course.dataValues.day_number, "COMPLETED", duration, userCourse.estimatedDuration);
                        if (userCourse.source === "Skillsoft" && userCourse.firstScore !== undefined) {
                            const newAssessment = yield (0, createPercipioAssessment_1.default)(trainee_id, batch_id, course.dataValues.course_id, course.dataValues.day_number, userCourse.firstScore, userCourse.highScore, userCourse.lastScore);
                        }
                    }
                    return;
                }
            }));
        });
        return res.status(200).json({ message: "successfully added percipio assessment" });
    }
    catch (error) {
        return res.status(500).json({ message: "wqert" });
    }
});
exports.default = percipioAssessmentController;
