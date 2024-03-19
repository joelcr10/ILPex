"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainees_1 = tslib_1.__importDefault(require("../../../models/trainees"));
const createTraineeServices = (user_id, batch_id, userID) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const createTrainee = yield trainees_1.default.create({
        user_id: user_id,
        batch_id: batch_id,
        isActive: true,
        createdBy: userID,
        modifiedBy: userID
    });
    return createTrainee;
});
exports.default = createTraineeServices;
