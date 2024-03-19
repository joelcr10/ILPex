"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const traineesByBatchIdServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_Services/traineesByBatchIdServices"));
const courseCountByDayNumberServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_Services/courseCountByDayNumberServices"));
const dayWiseIncompleteTraineesServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_Services/dayWiseIncompleteTraineesServices"));
const getBatchService_1 = tslib_1.__importDefault(require("../../services/TraineeServices/assessmentServices/getBatchService"));
const daywiseIncompleteTraineeNamesService_1 = tslib_1.__importDefault(require("../../services/l_and_d_Services/daywiseIncompleteTraineeNamesService"));
const getIncompleteTraineeList = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
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
        if (!traineeList) {
            return res.status(404).json({ error: "This batch has no trainees " });
        }
        else {
            const courseCount = yield (0, courseCountByDayNumberServices_1.default)(dayNumber);
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
                        const traineeNames = yield (0, daywiseIncompleteTraineeNamesService_1.default)(traineeIds, Number(day));
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
