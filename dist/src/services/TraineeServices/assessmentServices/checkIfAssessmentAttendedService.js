"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const results_1 = tslib_1.__importDefault(require("../../../models/results"));
const checkIfAssessmentAttended = (assessmentsList, trainee_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    //Fetching all the assessments assigned to a particular batch.
    const results = yield results_1.default.findAll({
        where: {
            assessment_batches_allocation_id: assessmentsList.map((assessment) => assessment.assessment_batch_allocation_id),
            trainee_id: trainee_id,
        },
    });
    return results;
});
exports.default = checkIfAssessmentAttended;
