"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const updateTrainee = (traine, status) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const trainee = yield traine.update({ isActive: status });
    return trainee;
});
exports.default = updateTrainee;
