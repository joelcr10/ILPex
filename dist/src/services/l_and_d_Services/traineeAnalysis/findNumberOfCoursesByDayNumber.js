"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const courses_1 = tslib_1.__importDefault(require("../../../models/courses"));
const findNumberOfCoursesByDayNumber = (currentDay) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const findNumberOfCourses = yield courses_1.default.count({ where: { day_number: currentDay } });
    if (findNumberOfCourses)
        return findNumberOfCourses;
    else
        return ({
            status: 404,
            error: 'No courses are allotted for this particular day'
        });
});
exports.default = findNumberOfCoursesByDayNumber;
