"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainee_progress_1 = tslib_1.__importDefault(require("../../models/trainee_progress"));
const checkTraineeProgress = (trainee_id, course_id, day_number) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const TrackExist = yield trainee_progress_1.default.findOne({
            where: {
                trainee_id: trainee_id,
                course_id: course_id,
                day_number: day_number
            }
        });
        return TrackExist;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.default = checkTraineeProgress;
