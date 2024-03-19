"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getDaywiseCourseServices_1 = tslib_1.__importDefault(require("../../services/TraineeServices/getDaywiseCourseServices"));
const getDayTraineeProgress_1 = tslib_1.__importDefault(require("../../services/TraineeServices/getDayTraineeProgress"));
const daywiseCourseStatus_1 = tslib_1.__importDefault(require("../../services/TraineeServices/daywiseCourseStatus"));
const findIncompleteCoursesListForEachTrainee = (trainee_id, day_number) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
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
