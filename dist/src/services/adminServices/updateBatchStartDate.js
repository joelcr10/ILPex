"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const updateStartDate = (batch, startDate) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const start_date = new Date(startDate);
    yield batch.update({ start_date: start_date });
    return batch;
});
exports.default = updateStartDate;
