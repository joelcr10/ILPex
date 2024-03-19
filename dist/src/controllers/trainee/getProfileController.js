"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getTraineeDetailsServices_1 = tslib_1.__importDefault(require("../../services/TraineeServices/getTraineeDetailsServices"));
const getProfile = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(req.params.user_id);
        if (!user_id) {
            return res.status(400).json({ message: 'user_id not valid' });
        }
        const data = yield (0, getTraineeDetailsServices_1.default)(user_id);
        if (data == null) {
            return res.status(404).json({ message: 'No User Found' });
        }
        return res.status(200).json({ data });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
exports.default = getProfile;
