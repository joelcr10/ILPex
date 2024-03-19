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
const getDaywiseCourseServices_1 = __importDefault(require("../../services/TraineeServices/getDaywiseCourseServices"));
const getDayTraineeProgress_1 = __importDefault(require("../../services/TraineeServices/getDayTraineeProgress"));
const daywiseCourseStatus_1 = __importDefault(require("../../services/TraineeServices/daywiseCourseStatus"));
const findIncompleteCoursesListForEachTrainee = (trainee_id, day_number) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch courses for the given day
        const coursesResponse = yield (0, getDaywiseCourseServices_1.default)(day_number);
        if (!coursesResponse) {
            return "Error getting day wise courses";
        }
        const courses = coursesResponse;
        // Fetch trainee progress for the given day
        const progressResponse = yield (0, getDayTraineeProgress_1.default)(trainee_id, day_number);
        if (!progressResponse) {
            return "Error getting trainee progress";
        }
        const progress = progressResponse;
        // Call daywiseCourseStatus to process courses and progress
        const courseProgress = (0, daywiseCourseStatus_1.default)(courses, progress);
        // Calculate the total number of courses
        const totalCourses = courses.length;
        // Calculate the number of incomplete courses and collect their names
        let incompleteCoursesCount = 0;
        const incompleteCourseNames = [];
        for (const course of courseProgress) {
            if (!course.status) {
                incompleteCoursesCount++;
                incompleteCourseNames.push(course.course_name);
            }
        }
        // Return all the data in a single object
        return {
            totalCourses,
            incompleteCoursesCount,
            incompleteCourseNames
        };
    }
    catch (error) {
        console.error("Error:", error);
        return "Error fetching status of day wise courses";
    }
});
exports.default = findIncompleteCoursesListForEachTrainee;
