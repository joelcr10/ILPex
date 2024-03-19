"use strict";
// findAssessmentBatchMapping
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assessment_batch_allocation_1 = tslib_1.__importDefault(require("../../../models/assessment_batch_allocation"));
const findAssessmentBatchMapping = (batch_id, assessmentId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    //Fetching all the assessments assigned to a particular batch.
    const assessmentBatchAllocation = yield assessment_batch_allocation_1.default.findOne({
        where: {
            batch_id: batch_id,
            assessment_id: assessmentId,
        },
    });
    return assessmentBatchAllocation;
});
exports.default = findAssessmentBatchMapping;
