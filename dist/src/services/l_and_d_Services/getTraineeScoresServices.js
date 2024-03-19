"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const results_1 = tslib_1.__importDefault(require("../../models/results"));
const getAssessmentName_1 = tslib_1.__importDefault(require("./getAssessmentName"));
const getTraineeScoresServices = (trainee_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const results = yield results_1.default.findAll({
        where: { trainee_id: trainee_id },
        attributes: ['result_id', 'assessment_batches_allocation_id', 'trainee_id', 'first_score', 'high_score', 'assessment_attempts'],
    });
    const scores = yield Promise.all(results.map((result) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { result_id, assessment_batches_allocation_id, trainee_id, first_score, high_score, assessment_attempts } = result;
        const assessmentDetails = yield (0, getAssessmentName_1.default)(assessment_batches_allocation_id);
        return {
            result_id,
            assessment_batches_allocation_id,
            trainee_id,
            first_score,
            high_score,
            assessment_attempts,
            assessmentDetails,
        };
    })));
    const ScoreSum = results.reduce((sum, score) => { var _a; return sum + ((_a = score.high_score) !== null && _a !== void 0 ? _a : 0); }, 0);
    const scoreAverage = ScoreSum / results.length;
    const noOfAssessmentsAttemted = results.length;
    return { scores, noOfAssessmentsAttemted, scoreAverage };
});
exports.default = getTraineeScoresServices;
