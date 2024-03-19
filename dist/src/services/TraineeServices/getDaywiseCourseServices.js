"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const courses_1 = tslib_1.__importDefault(require("../../models/courses"));
const getDaywiseCourseServices = (day_number) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const daywiseCourses = yield courses_1.default.findAll({
        where: { day_number: day_number },
        attributes: ['course_name', 'course_duration', 'course_type', 'day_number', 'course_id'],
    });
    return daywiseCourses;
});
exports.default = getDaywiseCourseServices;
