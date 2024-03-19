"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const traineList = (batch) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const traineList = batch.map(item => item.trainee_id);
    return traineList;
});
exports.default = traineList;
