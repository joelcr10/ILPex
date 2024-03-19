"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assessment_batch_allocation_1 = tslib_1.__importDefault(require("../../models/assessment_batch_allocation"));
const assessments_1 = tslib_1.__importDefault(require("../../models/assessments"));
const assessmentName = (assessment_batch_allocation_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const assessment = yield assessment_batch_allocation_1.default.findOne({
        where: { assessment_batch_allocation_id: assessment_batch_allocation_id },
        attributes: ['assessment_batch_allocation_id', 'assessment_id'],
        include: [
            {
                model: assessments_1.default,
                required: true,
                attributes: ['assessment_name']
            },
        ]
    });
    return assessment;
});
exports.default = assessmentName;
