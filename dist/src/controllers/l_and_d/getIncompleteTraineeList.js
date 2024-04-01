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
const traineesByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/traineesByBatchIdServices"));
const dayWiseIncompleteTraineesServices_1 = __importDefault(require("../../services/l_and_d_Services/dayWiseIncompleteTraineesServices"));
const getBatchService_1 = __importDefault(require("../../services/TraineeServices/assessmentServices/getBatchService"));
const daywiseIncompleteTraineeNamesService_1 = __importDefault(require("../../services/l_and_d_Services/daywiseIncompleteTraineeNamesService"));
const getCourseSetIdByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/getCourseSetIdByBatchIdServices"));
const getCourseCountByDayNumberAndCourseSetIdServices_1 = __importDefault(require("../../services/adminServices/getCourseCountByDayNumberAndCourseSetIdServices"));
const getIncompleteTraineeList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const day = req.params.id;
        const batchid = req.params.batch_id;
        if (!day) {
            return res.status(404).json({ message: "Day Number not defined" });
        }
        if (!batchid) {
            return res.status(404).json({ message: "Batch Id not defined" });
        }
        const dayNumber = parseInt(day);
        const batch_id = parseInt(batchid);
        const batch = yield (0, getBatchService_1.default)(batch_id);
        // Find trainee by user_id
        const traineeList = yield (0, traineesByBatchIdServices_1.default)(batch_id);
        const courseSetId = yield (0, getCourseSetIdByBatchIdServices_1.default)(Number(batch_id));
        if (!traineeList) {
            return res.status(404).json({ error: "This batch has no trainees " });
        }
        else {
            // const courseCount=await getCourseCountByDayNumber(dayNumber);
            const courseCount = yield (0, getCourseCountByDayNumberAndCourseSetIdServices_1.default)(dayNumber, courseSetId);
            if (!courseCount) {
                return res.status(404).json({ error: "No courses assigned to the given day number" });
            }
            else {
                const incompleteTraineeList = yield (0, dayWiseIncompleteTraineesServices_1.default)(traineeList, dayNumber, courseCount);
                if (!incompleteTraineeList) {
                    return res.status(404).json({ error: "Every trainee in this batch has completed this day's courses" });
                }
                else {
                    const traineeIds = incompleteTraineeList.map((trainee) => trainee.trainee_id);
                    if (Array.isArray(traineeIds) && traineeIds.length > 0) {
                        // Get trainee names based on trainee IDs
                        const traineeNames = yield (0, daywiseIncompleteTraineeNamesService_1.default)(traineeIds, Number(day), courseSetId);
                        const incompleteTraineeListWithBatch = traineeNames.map((traineeName) => ({
                            user_id: traineeName.user_id,
                            trainee_id: traineeName.trainee_id,
                            Batch: batch === null || batch === void 0 ? void 0 : batch.batch_name,
                            user_name: traineeName.user_name,
                            email: traineeName.email,
                            total_courses: traineeName.totalCourses,
                            incomplete_courses: traineeName.incompleteCoursesCount,
                            incomplete_courses_list: traineeName.incompleteCourseNames
                        }));
                        return res.status(200).json({ IncompleteTraineeList: incompleteTraineeListWithBatch });
                    }
                    else {
                        return res.status(404).json({ error: "No incomplete trainees found" });
                    }
                }
            }
        }
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.default = getIncompleteTraineeList;
