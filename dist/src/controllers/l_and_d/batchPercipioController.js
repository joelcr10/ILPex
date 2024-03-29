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
const findTraineesOfABatchServices_1 = __importDefault(require("../../services/l_and_d_services/trainee_analysis/findTraineesOfABatchServices"));
const percipioReportRequest_1 = __importDefault(require("../../services/percipio/percipioReportRequest"));
const learningActivity_1 = __importDefault(require("../../services/percipio/learningActivity"));
const getTraineeDetailsServices_1 = __importDefault(require("../../services/TraineeServices/getTraineeDetailsServices"));
const checkTraineeProgress_1 = __importDefault(require("../../services/TraineeServices/checkTraineeProgress"));
const createTraineeProgress_1 = __importDefault(require("../../services/TraineeServices/createTraineeProgress"));
const createPercipioAssessment_1 = __importDefault(require("../../services/TraineeServices/createPercipioAssessment"));
const getCourseSetIdByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/getCourseSetIdByBatchIdServices"));
const getAllCoursesOfABatch_1 = __importDefault(require("../../services/adminServices/getAllCoursesOfABatch"));
const batchPercipioController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { batch_id } = req.body;
        if (!batch_id) {
            return res.status(402).json({ message: "batch_id is missing in body" });
        }
        const reportRequestId = yield (0, percipioReportRequest_1.default)();
        const courseSetId = yield (0, getCourseSetIdByBatchIdServices_1.default)(batch_id);
        if (reportRequestId == null) {
            return res.status(404).json({ message: "Error fetching the report request id" });
        }
        console.log("report request", reportRequestId);
        let learningReport = yield (0, learningActivity_1.default)(reportRequestId);
        if (learningReport == null) {
            return res.status(404).json({ message: "Error fetching the Learning activity report from percipio" });
        }
        else if (learningReport.status === 'IN_PROGRESS') {
            let stopCount = 0;
            while (learningReport.status === "IN_PROGRESS") {
                learningReport = yield (0, learningActivity_1.default)(reportRequestId);
                if (stopCount > 10) {
                    return res.status(403).json({ message: "unable to fetch percipio report" });
                }
                stopCount++;
            }
        }
        const batchDetails = yield (0, findTraineesOfABatchServices_1.default)(batch_id);
        const traineeList = [];
        yield Promise.all(batchDetails.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const traineeDetails = yield (0, getTraineeDetailsServices_1.default)(item.user_id);
            traineeList.push({
                trainee_id: item.trainee_id,
                batch_id: item.batch_id,
                percipio_mail: traineeDetails.dataValues.percipio_email
            });
        })));
        const courses = yield (0, getAllCoursesOfABatch_1.default)(courseSetId);
        console.log("Courses ----", courses);
        if (courses == null) {
            return res.status(400).json({ message: "Error getting all courses" });
        }
        yield Promise.all(traineeList.map((student) => __awaiter(void 0, void 0, void 0, function* () {
            const userData = learningReport.filter((item) => item.userId == student.percipio_mail && item.status === "Completed");
            userData.map((userCourse) => {
                const courseName = userCourse.contentTitle;
                courses.map((course) => __awaiter(void 0, void 0, void 0, function* () {
                    if (courseName.toLowerCase() == course.dataValues.course_name.toLowerCase()) {
                        const TrackExist = yield (0, checkTraineeProgress_1.default)(student.trainee_id, course.dataValues.course_id, course.dataValues.day_number);
                        if (TrackExist == null) {
                            let duration = userCourse.duration;
                            if (userCourse.category === "Link") {
                                duration = userCourse.estimatedDuration;
                            }
                            const newTrack = yield (0, createTraineeProgress_1.default)(student.trainee_id, student.batch_id, course.dataValues.course_id, course.dataValues.day_number, "COMPLETED", duration, userCourse.estimatedDuration);
                            console.log("created new track");
                            if (userCourse.source === "Skillsoft" && userCourse.firstScore !== undefined) {
                                const newAssessment = yield (0, createPercipioAssessment_1.default)(student.trainee_id, student.batch_id, course.dataValues.course_id, course.dataValues.day_number, userCourse.firstScore, userCourse.highScore, userCourse.lastScore);
                            }
                        }
                        return;
                    }
                }));
            });
        })));
        return res.status(200).json({ message: "Successfully added batch report" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ ërror: "ïnternal server error" });
    }
});
exports.default = batchPercipioController;
