"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainees_1 = tslib_1.__importDefault(require("../../models/trainees"));
const getTraineesByBatchId = (batchId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield trainees_1.default.findAll({
        where: {
            batch_id: batchId,
        },
        attributes: ["trainee_id"],
    });
});
exports.default = getTraineesByBatchId;
