"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assessment_batch_allocation_1 = tslib_1.__importDefault(require("../../../models/assessment_batch_allocation"));
const updateAssessmentService = (user_id, assessment_id, batch_id, start_date, end_date) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const assessment_update = yield assessment_batch_allocation_1.default.create({ createdBy: user_id, assessment_id: assessment_id, batch_id: batch_id, assessment_status: true, start_date: start_date, end_date: end_date }, { raw: true });
    return assessment_update;
});
exports.default = updateAssessmentService;
