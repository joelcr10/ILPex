"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const courses_1 = tslib_1.__importDefault(require("../../models/courses"));
const getCourseCountByDayNumber = (dayNumber) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const courseCount = yield courses_1.default.count({
        where: {
            day_number: dayNumber,
        },
    });
    return courseCount;
});
exports.default = getCourseCountByDayNumber;
