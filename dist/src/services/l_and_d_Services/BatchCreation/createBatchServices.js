"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const batches_1 = tslib_1.__importDefault(require("../../../models/batches"));
const createBatchServices = (batch_name, start_date, end_date, userID) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const creatingBatch = yield batches_1.default.create({
        batch_name: batch_name,
        start_date: start_date,
        end_date: end_date,
        current_day: 0,
        isActive: true,
        createdBy: userID,
        updatedBy: userID
    });
    return creatingBatch;
});
exports.default = createBatchServices;
