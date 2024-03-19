"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assessments_1 = tslib_1.__importDefault(require("../../../types/modelTypes/assessments"));
const assessment_batch_allocation_1 = tslib_1.__importDefault(require("../../models/assessment_batch_allocation"));
const batches_1 = tslib_1.__importDefault(require("../../models/batches"));
const getAssessmentBatch = (assessment_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const traineeBatch = yield assessment_batch_allocation_1.default.findAll({
        include: [
            {
                //Join Batches model
                model: batches_1.default,
                required: true,
                attributes: ['batch_name']
            },
            {
                //Join Assessment model
                model: assessments_1.default,
                required: true,
                attributes: ['assessment_name']
            },
        ],
        where: { assessment_id: assessment_id },
        attributes: ['assessment_id', 'batch_id', 'start_date', 'end_date']
    });
    return traineeBatch;
});
exports.default = getAssessmentBatch;
