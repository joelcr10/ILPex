"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assessments_1 = tslib_1.__importDefault(require("../../../models/assessments"));
const getAssessmentDetailsService = (assessmentIds) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    //Fetching all the assessments details.
    const assessmentNames = yield assessments_1.default.findAll({
        where: {
            assessment_id: assessmentIds,
        },
        attributes: ["assessment_id", "assessment_name"],
    });
    return assessmentNames;
});
exports.default = getAssessmentDetailsService;
