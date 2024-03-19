"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assessment_batch_allocation_1 = tslib_1.__importDefault(require("../../../models/assessment_batch_allocation"));
const findAssessmentToBatchService = (assessment_id, batch_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const assessment = assessment_batch_allocation_1.default.findOne({ where: { assessment_id: assessment_id, batch_id: batch_id } });
    return assessment;
});
exports.default = findAssessmentToBatchService;
