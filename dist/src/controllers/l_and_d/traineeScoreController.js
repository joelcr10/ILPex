"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getTraineeScoresServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_Services/getTraineeScoresServices"));
const traineeScore = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainee_id = parseInt(req.params.trainee_id);
        if (!trainee_id) {
            return res.status(400).json({ message: 'trainee_id not defined' });
        }
        const scoreDetails = yield (0, getTraineeScoresServices_1.default)(trainee_id);
        if (scoreDetails == null) {
            return res.status(404).json({ message: 'No scores found for the specified trainee' });
        }
        return res.status(200).json({ scoreDetails });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
exports.default = traineeScore;
