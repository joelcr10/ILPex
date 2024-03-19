"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainee_progress_1 = tslib_1.__importDefault(require("../../models/trainee_progress"));
const checkTraineeProgress = (traineeList, dayNumber, courseCount) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const incompleteTraineeList = [];
    for (const trainee of traineeList) {
        const progressEntries = yield trainee_progress_1.default.findAll({
            where: {
                trainee_id: trainee.trainee_id,
                day_number: dayNumber,
            },
        });
        if (progressEntries.length !== courseCount) {
            incompleteTraineeList.push(trainee);
        }
    }
    return incompleteTraineeList;
});
exports.default = checkTraineeProgress;
