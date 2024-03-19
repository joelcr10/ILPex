"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const percipio_assessment_1 = tslib_1.__importDefault(require("../../models/percipio_assessment"));
const createPercipioAssessment = (trainee_id, batch_id, course_id, day_number, first_score, high_score, last_score) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAssessment = yield percipio_assessment_1.default.create({
            trainee_id: trainee_id,
            batch_id: batch_id,
            course_id: course_id,
            day_number: day_number,
            first_score: first_score,
            high_score: high_score,
            last_score: last_score
        });
        return newAssessment;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.default = createPercipioAssessment;
