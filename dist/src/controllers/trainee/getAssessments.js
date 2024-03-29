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
const getTraineeService_1 = __importDefault(require("../../services/TraineeServices/assessmentServices/getTraineeService"));
const getBatchService_1 = __importDefault(require("../../services/TraineeServices/assessmentServices/getBatchService"));
const getAssessmentBatchAllocationService_1 = __importDefault(require("../../services/TraineeServices/assessmentServices/getAssessmentBatchAllocationService"));
const getAssessmentDetailsService_1 = __importDefault(require("../../services/TraineeServices/assessmentServices/getAssessmentDetailsService"));
const checkIfAssessmentAttendedService_1 = __importDefault(require("../../services/TraineeServices/assessmentServices/checkIfAssessmentAttendedService"));
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
        else {
            // Find batch for the trainee
            const batch = yield (0, getBatchService_1.default)(trainee.batch_id);
            if (!batch) {
                return res
                    .status(404)
                    .json({ error: "The trainee has not been assigned a batch" });
            }
            else {
                // Find assessments for the batch
                const assessmentsList = yield (0, getAssessmentBatchAllocationService_1.default)(trainee.batch_id);
                if (!assessmentsList) {
                    return res
                        .status(404)
                        .json({ error: "No assessments have been assigned" });
                }
                else {
                    // Get results for the trainee
                    if (!(trainee.trainee_id === undefined)) {
                        const results = yield (0, checkIfAssessmentAttendedService_1.default)(assessmentsList, trainee.trainee_id);
                        // Remove assessments with existing results
                        const filteredAssessmentsList = assessmentsList.filter((assessment) => !results.some((result) => result.assessment_batches_allocation_id ===
                            assessment.assessment_batch_allocation_id));
                        const assessmentIds = filteredAssessmentsList.map((assessment) => assessment.assessment_id);
                        const assessmentNames = yield (0, getAssessmentDetailsService_1.default)(assessmentIds);
                        const combinedAssessments = filteredAssessmentsList.map((assessment) => {
                            const matchingName = assessmentNames.find((name) => name.assessment_id === assessment.assessment_id);
                            return {
                                assessment_id: assessment.assessment_id,
                                assessment_name: matchingName
                                    ? matchingName.assessment_name
                                    : null,
                                end_date: assessment.end_date,
                            };
                        });
                        // Extract relevant data from the result
                        const result = {
                            Batch: batch.batch_name,
                            assessments: combinedAssessments,
                        };
                        return res.status(200).json(result);
                    }
                }
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = getAssessments;
