"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const batches_1 = tslib_1.__importDefault(require("../models/batches"));
const findBatchNameByBatchIdServices = (batch_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const findBatchName = batches_1.default.findOne({ where: { batch_id: batch_id } });
    return findBatchName;
});
exports.default = findBatchNameByBatchIdServices;
