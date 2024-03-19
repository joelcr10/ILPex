"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assessments_1 = tslib_1.__importDefault(require("../../../models/assessments"));
const findAssessmentService = (assessment_name) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const assessment_found = yield assessments_1.default.findOne({ where: { assessment_name: assessment_name } });
    return assessment_found;
});
exports.default = findAssessmentService;
