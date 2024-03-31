"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const courses_1 = __importDefault(require("../../models/courses"));
const createCourseServices = (courseList, course_set_id) => __awaiter(void 0, void 0, void 0, function* () {
    // const newCourse = await Courses.bulkCreate(courseList);
    const newCourseList = yield courseList.map(course => (Object.assign(Object.assign({}, course), { course_set_id: course_set_id })));
    const newCourse = yield courses_1.default.bulkCreate(newCourseList);
    if (newCourse) {
        return newCourse;
    }
    return null;
});
exports.default = createCourseServices;
