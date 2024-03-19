"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getDaywiseCourseServices_1 = tslib_1.__importDefault(require("../../services/TraineeServices/getDaywiseCourseServices"));
const getDaywiseCourseController = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const day_number = Number(req.params.id);
        if (!day_number) {
            return res.status(400).json({ message: "day number is missing" });
        }
        const result = yield (0, getDaywiseCourseServices_1.default)(Number(day_number));
        if (result.length == 0) {
            return res.status(404).json({ message: "couldn't find any course on that day" });
        }
        return res.status(200).json({ message: result });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = getDaywiseCourseController;
