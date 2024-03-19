"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const results_1 = tslib_1.__importDefault(require("../../../models/results"));
const getExistingResultService = (assessment_batches_allocation_id, trainee_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const existingResult = yield results_1.default.findOne({
        where: {
            assessment_batches_allocation_id: assessment_batches_allocation_id,
            trainee_id: trainee_id,
        },
    });
    return existingResult;
});
exports.default = getExistingResultService;
