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
const courses_1 = __importDefault(require("../../models/courses"));
const trainee_progress_1 = __importDefault(require("../../models/trainee_progress"));
const traineeNamesService_1 = __importDefault(require("../../services/l_and_d_Services/traineeNamesService"));
const sequelize_1 = require("sequelize");
const traineesByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/traineesByBatchIdServices"));
const getIncompleteTraineeListForDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dayNumber = parseInt(req.params.day_id);
        const batchId = parseInt(req.params.batch_id);
        // Step 1: Get the list of trainees belonging to the batch
        const traineeList = yield (0, traineesByBatchIdServices_1.default)(batchId);
        if (!traineeList || traineeList.length === 0) {
            return res.status(404).json({ error: 'This batch has no trainees' });
        }
        // Step 2: Calculate the number of courses up to the given day
        const mainCount = yield courses_1.default.count({
            where: {
                day_number: { [sequelize_1.Op.lte]: dayNumber - 1 },
            },
        });
        // Step 3: Find incomplete trainees for the given day
        const incompleteTraineeList = [];
        // Fetch all progress entries for the trainees in a single query
        const progressEntries = yield trainee_progress_1.default.findAll({
            where: {
                trainee_id: traineeList.map(trainee => trainee.trainee_id),
                day_number: { [sequelize_1.Op.lt]: dayNumber }
            }
        });
        // Initialize an empty object to store progress counts
        const progressCounts = {};
        // Count the number of progress entries for each trainee
        progressEntries.forEach(entry => {
            progressCounts[entry.trainee_id] = (progressCounts[entry.trainee_id] || 0) + 1;
        });
        // Filter trainee list based on progress counts
        traineeList.forEach(trainee => {
            if (trainee.trainee_id) {
                const progressCount = progressCounts[trainee.trainee_id] || 0;
                if (progressCount === undefined || progressCount < mainCount) {
                    incompleteTraineeList.push(trainee);
                }
            }
        });
        // Step 4: Respond with the incomplete trainee list
        if (incompleteTraineeList.length === 0 && incompleteTraineeList === undefined) {
            return res.status(404).json({ error: 'Every trainee in this batch has completed all courses up to the given day' });
        }
        else {
            const traineeIds = incompleteTraineeList.map(trainee => trainee.trainee_id);
            const traineeNames = yield (0, traineeNamesService_1.default)(traineeIds);
            const incompleteTraineeListWithBatch = traineeNames.map(traineeName => ({
                user_id: traineeName.user_id,
                trainee_id: traineeName.trainee_id,
                batch_id: batchId,
                day: traineeName.current_day,
                user_name: traineeName.user_name,
                email: traineeName.email,
                total_courses: traineeName.totalCourses,
                incomplete_courses_count: traineeName.incompleteCoursesCount,
                incomplete_courses: traineeName.incompleteCourseNames
            }));
            return res.status(200).json({ IncompleteTraineeList: incompleteTraineeListWithBatch });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
});
exports.default = getIncompleteTraineeListForDay;
