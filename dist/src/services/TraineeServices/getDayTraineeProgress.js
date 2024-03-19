"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainee_progress_1 = tslib_1.__importDefault(require("../../models/trainee_progress"));
const getDayTraineeProgress = (trainee_id, day_number) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const progress = yield trainee_progress_1.default.findAll({
        where: { day_number: day_number, trainee_id: trainee_id },
        attributes: ['trainee_id', 'course_id', 'day_number', 'completion_status']
    });
    return progress;
});
exports.default = getDayTraineeProgress;
