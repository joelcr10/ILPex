"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainees_1 = tslib_1.__importDefault(require("../../models/trainees"));
const users_1 = tslib_1.__importDefault(require("../../models/users"));
const findCurrentDayForEachTrainee_1 = tslib_1.__importDefault(require("../adminServices/findCurrentDayForEachTrainee"));
const findIncompleteCoursesListForEachTrainee_1 = tslib_1.__importDefault(require("../adminServices/findIncompleteCoursesListForEachTrainee"));
const getTraineeNames = (traineeIds) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const traineeNames = [];
    try {
        for (const traineeId of traineeIds) {
            const trainee = yield trainees_1.default.findOne({
                where: {
                    trainee_id: traineeId,
                },
                attributes: ['trainee_id', 'user_id'],
            });
            if (trainee) {
                const user = yield users_1.default.findOne({
                    where: {
                        user_id: trainee.user_id,
                    },
                    attributes: ['user_name', 'email', 'user_id'],
                });
                if (user) {
                    const currentDay = yield (0, findCurrentDayForEachTrainee_1.default)(trainee.trainee_id);
                    const incompleteCoursesData = yield (0, findIncompleteCoursesListForEachTrainee_1.default)(trainee.trainee_id, currentDay);
                    // Push the trainee info along with incomplete course data to traineeNames array
                    traineeNames.push({
                        trainee_id: trainee.trainee_id,
                        user_name: user.user_name,
                        email: user.email,
                        user_id: user.user_id,
                        current_day: Number(currentDay),
                        totalCourses: incompleteCoursesData.totalCourses,
                        incompleteCoursesCount: incompleteCoursesData.incompleteCoursesCount,
                        incompleteCourseNames: incompleteCoursesData.incompleteCourseNames,
                    });
                }
            }
        }
        return traineeNames;
    }
    catch (error) {
        console.error('Error fetching trainee names:', error);
        throw error;
    }
});
exports.default = getTraineeNames;
