"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const percipioReportRequest_1 = __importDefault(require("../../services/percipio/percipioReportRequest"));
const learningActivity_1 = __importDefault(require("../../services/percipio/learningActivity"));
const getAllCourses_1 = __importDefault(require("../../services/adminServices/getAllCourses"));
const checkTraineeProgress_1 = __importDefault(require("../../services/TraineeServices/checkTraineeProgress"));
const createTraineeProgress_1 = __importDefault(require("../../services/TraineeServices/createTraineeProgress"));
const getTraineeDetailsServices_1 = __importDefault(require("../../services/TraineeServices/getTraineeDetailsServices"));
const createPercipioAssessment_1 = __importDefault(require("../../services/TraineeServices/createPercipioAssessment"));
const percipioReportController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({ message: "user id missing" });
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
        const traineeDetails = yield (0, getTraineeDetailsServices_1.default)(user_id);
        if (traineeDetails == null) {
            return res.status(404).json({ message: "Can't find the Trainee" });
        }
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
            console.log(courseName);
            courses.map((course) => __awaiter(void 0, void 0, void 0, function* () {
                if (courseName.toLowerCase() == course.dataValues.course_name.toLowerCase()) {
                    const TrackExist = yield (0, checkTraineeProgress_1.default)(trainee_id, course.dataValues.course_id, course.dataValues.day_number);
                    if (TrackExist == null) {
                        let duration = userCourse.duration;
                        if (userCourse.category === "Link") {
                            duration = userCourse.estimatedDuration;
                        }
                        const newTrack = yield (0, createTraineeProgress_1.default)(trainee_id, batch_id, course.dataValues.course_id, course.dataValues.day_number, "COMPLETED", duration, userCourse.estimatedDuration);
                        console.log("created new track");
                        if (userCourse.source === "Skillsoft" && userCourse.firstScore !== undefined) {
                            const newAssessment = yield (0, createPercipioAssessment_1.default)(trainee_id, batch_id, course.dataValues.course_id, course.dataValues.day_number, userCourse.firstScore, userCourse.highScore, userCourse.lastScore);
                        }
                    }
                    return;
                }
            }));
        });
        return res.status(200).json({ message: 'successfully updated trainee progress' });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ message: "internal server error" });
    }
});
exports.default = percipioReportController;
