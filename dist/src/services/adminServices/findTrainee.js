"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainees_1 = tslib_1.__importDefault(require("../../models/trainees"));
const findTrainee = (user_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const traine = yield trainees_1.default.findOne({ where: { user_id: user_id } });
    return traine;
});
exports.default = findTrainee;
