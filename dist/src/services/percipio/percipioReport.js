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
const getAllCourses_1 = __importDefault(require("../adminServices/getAllCourses"));
const percipioReportRequest_1 = __importDefault(require("./percipioReportRequest"));
const learningActivity_1 = __importDefault(require("./learningActivity"));
const trainee_progress_1 = __importDefault(require("../../models/trainee_progress"));
const checkTraineeProgress_1 = __importDefault(require("../TraineeServices/checkTraineeProgress"));
const percipioReport = () => __awaiter(void 0, void 0, void 0, function* () {
    const reportRequestId = yield (0, percipioReportRequest_1.default)("2024-04-05T00:00:00.000Z", "2024-05-07T00:00:00.000Z");
    const report = yield (0, learningActivity_1.default)(reportRequestId);
    const courses = yield (0, getAllCourses_1.default)();
    const userData = report.filter((item) => item.userId == "bs.akshara@experionglobal.com" &&
        item.status === "Completed");
    const traineeProgress = [];
    userData.map((userCourse) => {
        const courseName = userCourse.contentTitle;
        courses.map((course) => __awaiter(void 0, void 0, void 0, function* () {
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
