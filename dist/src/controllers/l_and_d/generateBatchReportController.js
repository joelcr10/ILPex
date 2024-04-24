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
const findTraineesOfABatchServices_1 = __importDefault(require("../../services/l_and_d_Services/trainee_analysis/findTraineesOfABatchServices"));
const findUserId_1 = __importDefault(require("../../services/adminServices/findUserId"));
const getCourseCollectionOfABatchByBatchIDServices_1 = __importDefault(require("./getCourseCollectionOfABatchByBatchIDServices"));
const getAllCoursesOfABatch_1 = __importDefault(require("../../services/adminServices/getAllCoursesOfABatch"));
const trainee_progress_1 = __importDefault(require("../../models/trainee_progress"));
const generateBatchReportController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batch_id = parseInt(req.params.batch_id);
        console.log("batch_id------------", batch_id);
        if (!batch_id) {
            return res.json({ error: "Please provide the batch_id" });
        }
        else {
            const coursesCollectionIdOfABatch = yield (0, getCourseCollectionOfABatchByBatchIDServices_1.default)(batch_id);
            const coursesOfABatch = yield (0, getAllCoursesOfABatch_1.default)(coursesCollectionIdOfABatch.course_set_id);
            const trainees = yield (0, findTraineesOfABatchServices_1.default)(batch_id);
            if (trainees) {
                const traineesData = [];
                for (const trainee of trainees) {
                    let watched = 0;
                    const user = yield (0, findUserId_1.default)(trainee.user_id);
                    const userName = user.user_name;
                    const traineeData = {
                        trainee: userName,
                        courses: [],
                        totalCourses: coursesOfABatch.length,
                        watchedCourses: watched,
                    };
                    for (const course of coursesOfABatch) {
                        const traineeReport = yield trainee_progress_1.default.findOne({
                            where: {
                                trainee_id: trainee.trainee_id,
                                course_id: course.course_id,
                            },
                        });
                        if (traineeReport) {
                            traineeData.courses.push({
                                course: course.course_name,
                                watchStatus: "Yes",
                                duration: course.course_duration,
                                watchTime: traineeReport.duration,
                            });
                            watched += 1;
                        }
                        else {
                            traineeData.courses.push({
                                course: course.course_name,
                                watchStatus: "No",
                                duration: course.course_duration,
                                watchTime: "NA",
                            });
                        }
                    }
                    traineesData.push(traineeData);
                }
                res.status(200).json(traineesData);
            }
        }
    }
    catch (error) {
        console.log("Error while generating the report", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = generateBatchReportController;
