"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const courses_1 = tslib_1.__importDefault(require("../../models/courses"));
const courseByCourseIdService = (course_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const course = yield courses_1.default.findOne({ where: { course_id: course_id } });
    return course;
});
exports.default = courseByCourseIdService;
