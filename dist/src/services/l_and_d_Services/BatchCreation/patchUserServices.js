"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainees_1 = tslib_1.__importDefault(require("../../../models/trainees"));
const users_1 = tslib_1.__importDefault(require("../../../models/users"));
const findBatchByBatchNameServices_1 = tslib_1.__importDefault(require("./findBatchByBatchNameServices"));
const patchUserServices = (duplicateTraineeStatus, Name, Email, batch_name) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const updateUserTable = yield users_1.default.update({ user_name: Name }, { where: { email: Email } });
    const findBatch = yield (0, findBatchByBatchNameServices_1.default)(batch_name);
    const batchId = findBatch === null || findBatch === void 0 ? void 0 : findBatch.batch_id;
    const updateTraineeTable = yield trainees_1.default.update({ batch_id: batchId }, { where: { user_id: duplicateTraineeStatus.user_id } });
    return updateTraineeTable;
});
exports.default = patchUserServices;
