"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getQuestionsService_1 = tslib_1.__importDefault(require("../../services/TraineeServices/assessmentServices/getQuestionsService"));
const getQuestionsForAssessment = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const assessmentId = req.params.id;
        if (!assessmentId) {
            return res.status(404).json({ message: "Assessment id not defined" });
        }
        const assessment_id = parseInt(assessmentId);
        // Find questions for the specified assessment_id
        const questionsList = yield (0, getQuestionsService_1.default)(assessment_id);
        if (questionsList) {
            return res.status(200).json({ questions: questionsList });
        }
        else {
            return res.status(404).json({
                questions: "Questions for this assessment cannot be found. Please try again.",
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = getQuestionsForAssessment;
