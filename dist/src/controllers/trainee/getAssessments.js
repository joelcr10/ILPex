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
const sequelize_1 = require("sequelize");
const assessment_batch_allocation_1 = __importDefault(require("../../models/assessment_batch_allocation"));
const results_1 = __importDefault(require("../../models/results"));
const getAssessmentDetailsService_1 = __importDefault(require("../../services/TraineeServices/assessmentServices/getAssessmentDetailsService"));
const getBatchService_1 = __importDefault(require("../../services/TraineeServices/assessmentServices/getBatchService"));
const getTraineeService_1 = __importDefault(require("../../services/TraineeServices/assessmentServices/getTraineeService"));
const getAssessments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.params.id;
        if (!userid) {
            return res.status(404).json({ message: "User id not defined" });
        }
        const user_id = parseInt(userid);
        // Find trainee by user_id
        const trainee = yield (0, getTraineeService_1.default)(user_id);
        if (!trainee) {
            return res.status(404).json({ error: "Trainee not found" });
        }
        // Find batch for the trainee
        const batch = yield (0, getBatchService_1.default)(trainee.batch_id);
        if (!batch) {
            return res
                .status(404)
                .json({ error: "The trainee has not been assigned a batch" });
        }
        // Find assessments for the batch
        const currentDate = new Date();
        const assessmentsList = yield assessment_batch_allocation_1.default.findAll({
            where: {
                batch_id: trainee.batch_id,
                start_date: { [sequelize_1.Op.lte]: currentDate },
                end_date: { [sequelize_1.Op.gte]: currentDate },
            },
            attributes: [
                "assessment_batch_allocation_id",
                "assessment_id",
                "end_date",
                "start_date",
                "number_of_attempts",
            ],
        });
        if (!assessmentsList || assessmentsList.length === 0) {
            const result = {
                assessments: []
            };
            return res.status(200).json(result);
        }
        // Get results for the trainee
        const results = yield results_1.default.findAll({
            where: {
                trainee_id: trainee.trainee_id,
                [sequelize_1.Op.and]: assessmentsList.map((assessment) => ({
                    assessment_batches_allocation_id: assessment.assessment_batch_allocation_id,
                    assessment_attempts: { [sequelize_1.Op.gte]: assessment.number_of_attempts },
                })),
            },
        });
        // Remove assessments with existing results
        const filteredAssessmentsList = assessmentsList.filter((assessment) => {
            const result = results.find((result) => result.assessment_batches_allocation_id ===
                assessment.assessment_batch_allocation_id);
            // Include the assessment if it's not found in results
            return !result;
        });
        // Check if assessmentIds is not empty and is an array
        if (filteredAssessmentsList.length > 0) {
            // Fetching assessment_attempts from Results table for each assessment in filteredAssessmentsList
            const assessmentsAttempts = yield Promise.all(filteredAssessmentsList.map((assessment) => __awaiter(void 0, void 0, void 0, function* () {
                // Find the corresponding result for the current assessment
                const result = yield results_1.default.findOne({
                    where: {
                        assessment_batches_allocation_id: assessment.assessment_batch_allocation_id,
                        trainee_id: trainee.trainee_id,
                    },
                });
                if (result) {
                    // Subtracting the attempts made from the total allowed attempts
                    const attempts_left = assessment.number_of_attempts - result.assessment_attempts;
                    return {
                        assessment_id: assessment.assessment_id,
                        attempts_left: Math.max(attempts_left, 0),
                        end_date: assessment.end_date,
                    };
                }
                else {
                    // If no result is found, assume all attempts are left
                    return {
                        assessment_id: assessment.assessment_id,
                        attempts_left: assessment.number_of_attempts,
                        end_date: assessment.end_date,
                    };
                }
            })));
            // Merge the attempts_left with filteredAssessmentsList
            const Assessments = filteredAssessmentsList.map((assessment, index) => (Object.assign(Object.assign({}, assessment), { assessment_id: assessmentsAttempts[index].assessment_id, attempts_left: assessmentsAttempts[index].attempts_left, end_date: assessmentsAttempts[index].end_date })));
            const assessmentIds = Assessments.map((assessment) => assessment.assessment_id);
            const assessmentNames = yield (0, getAssessmentDetailsService_1.default)(assessmentIds);
            const combinedAssessments = Assessments.map((assessment) => {
                const matchingName = assessmentNames.find((name) => name.assessment_id === assessment.assessment_id);
                return {
                    assessment_id: assessment.assessment_id,
                    assessment_name: matchingName ? matchingName.assessment_name : null,
                    end_date: assessment.end_date,
                    attempts_left: assessment.attempts_left,
                };
            });
            // Extract relevant data from the result
            const filteredAssessments = combinedAssessments.filter((assessment) => assessment.attempts_left > 0);
            const result = {
                Batch: batch.batch_name,
                assessments: filteredAssessments,
            };
            return res.status(200).json(result);
        }
        else {
            const result = {
                assessments: []
            };
            return res.status(200).json(result);
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: error.message || "Internal server error" });
    }
});
exports.default = getAssessments;
