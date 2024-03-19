"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const results_1 = tslib_1.__importDefault(require("../../../models/results"));
const createResultService = (assessmentId, trainee_id, score) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield results_1.default.create({
        assessment_batches_allocation_id: assessmentId,
        trainee_id: trainee_id,
        first_score: score,
        high_score: score,
        assessment_attempts: 1,
    });
});
exports.default = createResultService;
