"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getTraineeService_1 = tslib_1.__importDefault(require("../../services/TraineeServices/assessmentServices/getTraineeService"));
const updateExistingResultService_1 = tslib_1.__importDefault(require("../../services/TraineeServices/assessmentServices/updateExistingResultService"));
const getExistingResultService_1 = tslib_1.__importDefault(require("../../services/TraineeServices/assessmentServices/getExistingResultService"));
const createResultService_1 = tslib_1.__importDefault(require("../../services/TraineeServices/assessmentServices/createResultService"));
const findAssessmentBatchMappingService_1 = tslib_1.__importDefault(require("../../services/TraineeServices/assessmentServices/findAssessmentBatchMappingService"));
const updateScore = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const assessmentId = req.body.assessment_id;
        const userId = req.body.user_id;
        const score = req.body.score;
        if (!assessmentId) {
            return res.status(404).json({ error: "assessmentId not defined" });
        }
        if (!userId) {
            return res.status(404).json({ error: "userId not defined" });
        }
        if (score == undefined) {
            return res.status(404).json({ error: "score not defined" });
        }
        const trainee = yield (0, getTraineeService_1.default)(userId);
        if (!trainee) {
            return res.status(404).json({ error: "Trainee not found" });
        }
        // Check if the row already exists for the given assessment_id and trainee_id
        if (trainee.trainee_id && trainee.batch_id) {
            const assessmentBatchAllocation = yield (0, findAssessmentBatchMappingService_1.default)(trainee.batch_id, assessmentId);
            if (assessmentBatchAllocation) {
                const existingResult = yield (0, getExistingResultService_1.default)(assessmentBatchAllocation.assessment_batch_allocation_id, trainee.trainee_id);
                if (existingResult) {
                    // Row exists, update high_Score if the new score is higher and increment assessment_attempts
                    if (score > existingResult.dataValues.high_score) {
                        yield (0, updateExistingResultService_1.default)(score, existingResult);
                    }
                    yield existingResult.increment("assessment_attempts");
                    return res.status(200).json({ message: "Result updated successfully" });
                }
                else {
                    // Row doesn't exist, create a new row
                    yield (0, createResultService_1.default)(assessmentBatchAllocation.assessment_batch_allocation_id, trainee.trainee_id, score);
                    return res.status(201).json({ message: "Result created successfully" });
                }
            }
            else {
                return res.status(404).json({ error: "This assessment is not assigned to this batch" });
            }
        }
        else {
            return res.status(404).json({ error: "Trainee id not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = updateScore;
