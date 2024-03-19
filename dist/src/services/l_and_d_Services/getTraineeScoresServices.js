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
const results_1 = __importDefault(require("../../models/results"));
const getAssessmentName_1 = __importDefault(require("./getAssessmentName"));
const getTraineeScoresServices = (trainee_id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield results_1.default.findAll({
        where: { trainee_id: trainee_id },
        attributes: ['result_id', 'assessment_batches_allocation_id', 'trainee_id', 'first_score', 'high_score', 'assessment_attempts'],
    });
    const scores = yield Promise.all(results.map((result) => __awaiter(void 0, void 0, void 0, function* () {
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
