"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const individualTraineeProgress_1 = tslib_1.__importDefault(require("../../services/TraineeServices/individualTraineeProgress"));
const calculateTraineeProgress_1 = tslib_1.__importDefault(require("../../services/TraineeServices/calculateTraineeProgress"));
const dayCardController = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const trainee_id = Number(req.params.trainee_id);
    const traineeProgress = yield (0, individualTraineeProgress_1.default)(trainee_id);
    if (traineeProgress == null) {
        return res.status(404).json({ message: "can't find trainee progress" });
    }
    else if (traineeProgress.length === 0) {
        return res.status(404).json({ message: "trainee doesn't have any progress reported" });
    }
    const dayCard = yield (0, calculateTraineeProgress_1.default)(trainee_id);
    return res.status(200).json({ data: dayCard });
});
exports.default = dayCardController;
