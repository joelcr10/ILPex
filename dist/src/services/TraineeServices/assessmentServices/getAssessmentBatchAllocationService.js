"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assessment_batch_allocation_1 = tslib_1.__importDefault(require("../../../models/assessment_batch_allocation"));
const getAssessmentBatchAllocation = (batch_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    //Fetching all the assessments assigned to a particular batch.
    const assessmentsList = yield assessment_batch_allocation_1.default.findAll({
        where: {
            batch_id: batch_id,
        },
        attributes: ["assessment_batch_allocation_id", "assessment_id", "end_date"],
    });
    return assessmentsList;
});
exports.default = getAssessmentBatchAllocation;
