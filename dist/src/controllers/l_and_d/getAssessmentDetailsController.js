"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getQuestionsService_1 = tslib_1.__importDefault(require("../../services/TraineeServices/assessmentServices/getQuestionsService"));
const getAssessmentBatchesServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_Services/getAssessmentBatchesServices"));
const getAssessmentDetails = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const assesment_id = parseInt(req.params.assessment_id);
        if (assesment_id == null) {
            return res.status(400).json({ message: "Assessment Id not defined" });
        }
        const questions = yield (0, getQuestionsService_1.default)(assesment_id);
        if (questions == null) {
            return res.status(404).json({ message: "No Questions Found" });
        }
        const assessmentBatch = yield (0, getAssessmentBatchesServices_1.default)(assesment_id);
        if (assessmentBatch == null) {
            return res.status(404).json({ message: "No Assessment Found" });
        }
        return res.status(200).json({ questions, assessmentBatch });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
exports.default = getAssessmentDetails;
