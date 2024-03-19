"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainee_progress_1 = tslib_1.__importDefault(require("../../../models/trainee_progress"));
const findBatchDayWiseProgressService = (batch_id, day_number) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const batchProgressCount = yield trainee_progress_1.default.count({ where: { batch_id: batch_id, completion_status: "COMPLETED", day_number: day_number } });
    return batchProgressCount;
});
exports.default = findBatchDayWiseProgressService;
