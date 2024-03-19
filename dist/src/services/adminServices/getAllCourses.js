"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const courses_1 = tslib_1.__importDefault(require("../../models/courses"));
const getAllCourses = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const daywiseCourses = yield courses_1.default.findAll();
    return daywiseCourses;
});
exports.default = getAllCourses;
