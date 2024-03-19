"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getTraineeDetailsServices_1 = tslib_1.__importDefault(require("../../services/TraineeServices/getTraineeDetailsServices"));
const getAllCourses_1 = tslib_1.__importDefault(require("../../services/adminServices/getAllCourses"));
const individualTraineeProgress_1 = tslib_1.__importDefault(require("../../services/TraineeServices/individualTraineeProgress"));
const getTraineeDurationController = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = Number(req.params.user_id);
        if (!user_id) {
            return res.status(400).json({ message: "Invalid user_id in request param" });
        }
        const traineeDetails = yield (0, getTraineeDetailsServices_1.default)(user_id);
        if (traineeDetails == null) {
            return res.status(404).json({ message: "Can't find the Trainee" });
        }
        const trainee_id = traineeDetails.trainee.trainee_id;
        const batch_id = traineeDetails.trainee.batch_id;
        const percipio_mail = traineeDetails.dataValues.percipio_email;
        const courses = yield (0, getAllCourses_1.default)();
        const traineeProgress = yield (0, individualTraineeProgress_1.default)(trainee_id);
        traineeProgress.reverse();
        // console.log(traineeProgress);
        const traineeDuration = [];
        yield Promise.all(traineeProgress === null || traineeProgress === void 0 ? void 0 : traineeProgress.map((item) => {
            const course = getCourse(courses, item === null || item === void 0 ? void 0 : item.course_id);
            traineeDuration.push({
                trainee_id: item.trainee_id,
                batch_id: item.batch_id,
                day_number: item.day_number,
                course_id: item.course_id,
                course_name: course.course_name,
                course_duration: item.estimated_duration,
                duration: item.duration,
            });
        }));
        return res.status(200).json({ data: traineeDuration });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
const getCourse = (courses, course_id) => {
    const course = courses.find((course) => course.course_id === course_id);
    return course;
};
exports.default = getTraineeDurationController;
