"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assessments_1 = tslib_1.__importDefault(require("../../../models/assessments"));
const uploadAssessmentService = (assessment_name, user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const assessment = yield assessments_1.default.create({ assessment_name: assessment_name, createdBy: user.user_id }, { raw: true });
    return assessment;
});
exports.default = uploadAssessmentService;
