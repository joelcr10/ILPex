"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const courses_1 = tslib_1.__importDefault(require("../../models/courses"));
const findCoursesInADayByCurrentDayServices = (day_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const findCourses = courses_1.default.findAll({ where: { day_number: day_id } });
    return findCourses;
});
exports.default = findCoursesInADayByCurrentDayServices;
