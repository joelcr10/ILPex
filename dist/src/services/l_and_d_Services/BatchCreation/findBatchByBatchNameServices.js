"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const batches_1 = tslib_1.__importDefault(require("../../../models/batches"));
const findBatchByBatchNameServices = (batch_name) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const findBatch = yield batches_1.default.findOne({ where: { batch_name: batch_name } });
    return findBatch;
});
exports.default = findBatchByBatchNameServices;
