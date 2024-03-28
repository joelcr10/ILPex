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
const findAssessmentToBatchService_1 = __importDefault(require("../../services/l_and_d_services/update_assessment/findAssessmentToBatchService"));
const findBatchService_1 = __importDefault(require("../../services/l_and_d_services/create_assessment/findBatchService"));
const updateAssessmentService_1 = __importDefault(require("../../services/l_and_d_services/update_assessment/updateAssessmentService"));
const updateAssessments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extracting required data from request body
        const { user_id, assessment_id, batch_id, start_date, end_date } = req.body;
        // Checking if all required fields are provided
        if (!user_id || !assessment_id || !batch_id || !start_date || !end_date) {
            return res.status(404).json({ error: "Please ensure that the user_id,assessment_id,batch_id,start_date and end-date is provided" });
        }
        // Checking if the assessment is already assigned to the same batch
        const assessment_batch_found = yield (0, findAssessmentToBatchService_1.default)(assessment_id, batch_id);
        if (assessment_batch_found) {
            return res.status(403).json({ error: "Same assessment cannot be assigned to the same batch twice" });
        }
        else {
            // Finding the batch using batch_id
            const batch = yield (0, findBatchService_1.default)(batch_id);
            if (batch) {
                // Validating assessment start and end dates against batch start and end dates
                const batch_start_date = new Date(batch.start_date);
                console.log(batch_start_date);
                const batch_end_date = new Date(batch.end_date);
                const assessment_start_date = new Date(start_date);
                const assessment_end_date = new Date(end_date);
                if (assessment_start_date < assessment_end_date) {
                    if (batch_start_date < assessment_start_date && assessment_end_date < batch_end_date) {
                        // Updating the assessment
                        const update_assessment = yield (0, updateAssessmentService_1.default)(user_id, assessment_id, batch_id, start_date, end_date);
                        if (update_assessment) {
                            return res.status(202).json({ message: `Assessment updated successfully for ${batch.batch_name}` });
                        }
                        else {
                            return res.status(500).json({ error: "Updation of assessment failed." });
                        }
                    }
                    else {
                        return res.status(400).json({ error: "The due date specified is not in the range of the batch start and end dates" });
                    }
                }
                else {
                    return res.status(400).json({ error: "Please ensure that the dates are vaild" });
                }
            }
            else {
                return res.status(404).json({ error: "No such batch is found" });
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});
exports.default = updateAssessments;
