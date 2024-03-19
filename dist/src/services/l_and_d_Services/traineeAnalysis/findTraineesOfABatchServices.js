"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainees_1 = tslib_1.__importDefault(require("../../../models/trainees"));
const findTraineesOfABatchServices = (batch_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const findTrainees = yield trainees_1.default.findAll({ where: { batch_id: batch_id } });
    if (findTrainees)
        return findTrainees;
    // else
    // return {
    //     status : 404,
    //     error : 'User already exists in the Database!'
    //     }
});
exports.default = findTraineesOfABatchServices;
