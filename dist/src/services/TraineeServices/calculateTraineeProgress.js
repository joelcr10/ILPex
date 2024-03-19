"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getDayTraineeProgress_1 = tslib_1.__importDefault(require("./getDayTraineeProgress"));
const getDaywiseCourseServices_1 = tslib_1.__importDefault(require("./getDaywiseCourseServices"));
const calculateTraineeProgress = (trainee_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let dayCard = [];
    let currentDay = 0;
    let unlocked = true;
    for (let i = 1; i <= 22; i++) {
        currentDay = i;
        const currentDayCourses = yield (0, getDaywiseCourseServices_1.default)(currentDay);
        let status = false;
        let dayProgress = 0;
        if (unlocked) {
            const currentDayProgress = yield (0, getDayTraineeProgress_1.default)(trainee_id, currentDay);
            if (currentDayCourses.length === currentDayProgress.length) {
                dayProgress = 100;
                status = true;
            }
            else if (currentDayCourses.length <= currentDayProgress.length) {
                dayProgress = 100;
                status = true;
            }
            else {
                dayProgress = (currentDayProgress.length / currentDayCourses.length) * 100;
                status = true;
                unlocked = false;
            }
        }
        const duration = getCourseDuration(currentDayCourses);
        dayCard.push({
            day_number: i,
            progress: dayProgress,
            status: status,
            duration: duration
        });
        if (i === 15) {
            i++;
        }
    }
    return dayCard;
});
const getCourseDuration = (currentDayCourses) => {
    let duration = 0;
    currentDayCourses.map((item) => {
        let itemDuration = item.course_duration;
        let matchResult = itemDuration.match(/((\d+)h)?\s*((\d+)m)?\s*((\d+)s)?/);
        if (matchResult) {
            var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0; // Convert the matched hours to an integer
            var minutes = matchResult[4] ? parseInt(matchResult[4], 10) : 0; // Convert the matched minutes to an integer
            var seconds = matchResult[6] ? parseInt(matchResult[6], 10) : 0; // Convert the matched seconds to an integer
            duration = duration + (hours * 60 * 60) + (minutes * 60) + seconds; //converting everything to seconds
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
exports.default = calculateTraineeProgress;
