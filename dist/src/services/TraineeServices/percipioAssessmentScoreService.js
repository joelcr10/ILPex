"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const percipio_assessment_1 = tslib_1.__importDefault(require("../../models/percipio_assessment"));
const percipioAssessmentScoreService = (trainee_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const assessment = yield percipio_assessment_1.default.findAll({ where: { trainee_id: trainee_id } });
    return assessment;
});
exports.default = percipioAssessmentScoreService;
