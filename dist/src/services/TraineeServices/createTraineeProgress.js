"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainee_progress_1 = tslib_1.__importDefault(require("../../models/trainee_progress"));
const createTraineeProgress = (trainee_id, batch_id, course_id, day_number, completion_status, duration, estimated_duration) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTrack = yield trainee_progress_1.default.create({
            trainee_id: trainee_id,
            batch_id: batch_id,
            day_number: day_number,
            course_id: course_id,
            completion_status: "COMPLETED",
            duration: Number(duration),
            estimated_duration: Number(estimated_duration)
        });
        return newTrack;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.default = createTraineeProgress;
