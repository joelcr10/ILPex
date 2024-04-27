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
const getAllCoursesOfABatch_1 = __importDefault(require("../adminServices/getAllCoursesOfABatch"));
const getDayTraineeProgress_1 = __importDefault(require("./getDayTraineeProgress"));
const getDaywiseCourseServices_1 = __importDefault(require("./getDaywiseCourseServices"));
function findHighestDayNumber(courses) {
    let highestDayNumber = -Infinity;
    for (let course of courses) {
        if (course.day_number > highestDayNumber) {
            highestDayNumber = course.day_number;
        }
    }
    return highestDayNumber;
}
const calculateTraineeStatus = (trainee_id, courseSetId) => __awaiter(void 0, void 0, void 0, function* () {
    let dayCard = [];
    let currentDay = 0;
    const courses = yield (0, getAllCoursesOfABatch_1.default)(courseSetId);
    const highestDayNumber = findHighestDayNumber(courses);
    for (let i = 1; i <= highestDayNumber; i++) {
        currentDay = i;
        const currentDayCourses = yield (0, getDaywiseCourseServices_1.default)(currentDay, courseSetId);
        let status = false;
        let dayProgress = 0;
        const currentDayProgress = yield (0, getDayTraineeProgress_1.default)(trainee_id, currentDay);
        if (currentDayCourses.length <= currentDayProgress.length) {
            dayProgress = 100;
            status = true;
        }
        else {
            dayProgress =
                (currentDayProgress.length / currentDayCourses.length) * 100;
            status = true;
        }
        const duration = getCourseDuration(currentDayCourses);
        dayCard.push({
            day_number: i,
            progress: dayProgress,
            status: status,
            duration: duration,
        });
        // if(i===15){
        //     i++;
        // }
    }
    return dayCard;
});
const getCourseDuration = (currentDayCourses) => {
    let duration = 0;
    currentDayCourses.map((item) => {
        let itemDuration = item.course_duration;
        let matchResult = itemDuration.match(/((\d+)h)?\s*((\d+)m)?\s*((\d+)s)?/);
        if (matchResult) {
            var hours = matchResult[2]
                ? parseInt(matchResult[2], 10)
                : 0; // Convert the matched hours to an integer
            var minutes = matchResult[4]
                ? parseInt(matchResult[4], 10)
                : 0; // Convert the matched minutes to an integer
            var seconds = matchResult[6]
                ? parseInt(matchResult[6], 10)
                : 0; // Convert the matched seconds to an integer
            duration = duration + hours * 60 * 60 + minutes * 60 + seconds; //converting everything to seconds
        }
        else {
            console.log("No match found");
        }
    });
    var hours = Math.floor(duration / 3600); // Get the whole hours
    var minutes = Math.floor((duration % 3600) / 60); // Get the whole minutes
    if (minutes === 0) {
        return hours + "h";
    }
    if (hours === 0) {
        return minutes + "m";
    }
    return hours + "h " + minutes + "m";
};
exports.default = calculateTraineeStatus;
