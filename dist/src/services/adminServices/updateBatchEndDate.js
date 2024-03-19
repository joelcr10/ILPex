"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const updateEndDate = (batch, endDate) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const start_date = new Date(endDate);
    yield batch.update({ end_date: start_date });
    return batch;
});
exports.default = updateEndDate;
