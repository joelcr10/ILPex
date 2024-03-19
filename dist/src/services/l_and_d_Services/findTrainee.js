"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainees_1 = tslib_1.__importDefault(require("../../models/trainees"));
const findTrainee = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log('entered');
    const batch = yield trainees_1.default.findAll({
        attributes: ['trainee_id'],
        where: { batch_id: id }
    });
    return batch;
});
exports.default = findTrainee;
