"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getDaywiseCourseServices_1 = tslib_1.__importDefault(require("../../services/TraineeServices/getDaywiseCourseServices"));
const getDayTraineeProgress_1 = tslib_1.__importDefault(require("../../services/TraineeServices/getDayTraineeProgress"));
const daywiseCourseStatus_1 = tslib_1.__importDefault(require("../../services/TraineeServices/daywiseCourseStatus"));
const daywiseTracking = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const trainee_id = Number(req.params.trainee_id);
    const day_number = Number(req.params.day_number);
    if (!trainee_id || !day_number) {
        return res.status(400).json({ message: "Invalid trainee_id or day_number" });
    }
    const courses = yield (0, getDaywiseCourseServices_1.default)(day_number);
    if (courses == null) {
        return res.status(404).json({ message: 'error getting day wise courses' });
    }
    const progress = yield (0, getDayTraineeProgress_1.default)(trainee_id, day_number);
    if (progress == null) {
        return res.status(404).json({ message: "error getting trainee progress" });
    }
    const courseProgress = yield (0, daywiseCourseStatus_1.default)(courses, progress);
    if (courseProgress.length == 0) {
        return res.status(400).json({ message: 'Error fetching status of day wise courses' });
    }
    return res.status(200).json({ message: courseProgress });
});
exports.default = daywiseTracking;
