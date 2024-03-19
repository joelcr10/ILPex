"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assessments_1 = tslib_1.__importDefault(require("../../models/assessments"));
const getAllAsssessmentsServices = (offset, sortKey, sortOrder) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const assessments = yield assessments_1.default.findAll({
        order: [[sortKey, sortOrder]],
        offset: offset,
        // limit: 5,
        attributes: ['assessment_id', 'assessment_name'],
    });
    return assessments;
});
exports.default = getAllAsssessmentsServices;
