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
const findLargestDayNumberInTheCourseSetServices = (courseSetId) => __awaiter(void 0, void 0, void 0, function* () {
    const course_list = yield courses_1.default.findAll({
        where: { course_set_id: courseSetId },
    });
    const distinctDayNumbers = [
        ...new Set(course_list.map((course) => course.day_number)),
    ];
    const largestDayNumber = Math.max(...distinctDayNumbers);
    return largestDayNumber;
});
exports.default = findLargestDayNumberInTheCourseSetServices;
