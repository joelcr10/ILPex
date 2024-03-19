"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainee_progress_1 = tslib_1.__importDefault(require("../../models/trainee_progress"));
const findCourseProgressInAParticularDayServices = (trainee_id, day_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const findTraineeProgress = trainee_progress_1.default.findAll({ where: { trainee_id: trainee_id, day_number: day_id } });
    return findTraineeProgress;
});
exports.default = findCourseProgressInAParticularDayServices;
