"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainee_progress_1 = tslib_1.__importDefault(require("../../../models/trainee_progress"));
const findTraineeStatusServices = (trainee_id, currentDay) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let findStatus = yield trainee_progress_1.default.count({ where: { trainee_id: trainee_id, day_number: currentDay } });
    if (findStatus === null)
        return 0;
    return findStatus;
});
exports.default = findTraineeStatusServices;
