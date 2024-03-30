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
const findBatchDayWiseProgressService_1 = __importDefault(require("../../services/l_and_d_services/batch_daywise_progress/findBatchDayWiseProgressService"));
const findBatch_1 = __importDefault(require("../../services/adminServices/findBatch"));
const getTraineesCount_1 = __importDefault(require("../../services/l_and_d_Services/getTraineesCount"));
const getDaywiseCourseServices_1 = __importDefault(require("../../services/TraineeServices/getDaywiseCourseServices"));
const getDayCountService_1 = __importDefault(require("../../services/l_and_d_services/batch_daywise_progress/getDayCountService"));
const getCourseSetIdByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/getCourseSetIdByBatchIdServices"));
// Initialize an empty object to store progress data
let progressData = {};
const getBatchDayWiseProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extracting batch_id from request parameters
        const batch_id = parseInt(req.params.batch_id);
        const courseSetId = yield (0, getCourseSetIdByBatchIdServices_1.default)(batch_id);
        // Checking if batch_id is provided
        if (!batch_id) {
            return res.status(400).json({ message: "Please ensure that the batch_id is provided" });
        }
        else {
            // Finding the batch
            const batch_found = yield (0, findBatch_1.default)(batch_id);
            if (!batch_found) {
                return res.status(404).json({ error: "Invalid batch_id" });
            }
            else {
                const totalDays = yield (0, getDayCountService_1.default)(batch_id);
                if (totalDays != 0) {
                    const currentDay = totalDays[0].dataValues.day_number;
                    // Getting the count of trainees in the batch
                    const trainee_count = yield (0, getTraineesCount_1.default)(batch_id);
                    for (let i = 1; i <= currentDay; i++) {
                        //since the day 15 and day 16 has the same courses.
                        if (i === 16) {
                            continue;
                        }
                        // getting the count of trainees who have completed the course.
                        const batchDayWiseProgressCount = yield (0, findBatchDayWiseProgressService_1.default)(batch_id, i);
                        // getting the courses on each day
                        const dayWiseCourses = yield (0, getDaywiseCourseServices_1.default)(i, courseSetId);
                        const dayWiseCourses_count = (dayWiseCourses).length;
                        // multiplying the number of courses on each day and the trainee count in each batch to get total courses.
                        const total_courses = trainee_count * dayWiseCourses_count;
                        let progress = (batchDayWiseProgressCount / (total_courses)) * 100;
                        if (isNaN(progress)) {
                            progress = 0;
                        }
                        if (progress !== null) {
                            progressData[i] = progress;
                        }
                    }
                }
                else {
                    return res.status(404).json({ error: "There is no progress for the batch" });
                }
            }
            return res.status(200).json({ data: { progressData } });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});
exports.default = getBatchDayWiseProgress;
