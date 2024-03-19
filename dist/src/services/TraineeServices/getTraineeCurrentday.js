"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainee_progress_1 = tslib_1.__importDefault(require("../../models/trainee_progress"));
const getTraineeCurrentDay = (trainee_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const currentDay = yield trainee_progress_1.default.findAll({
        where: { trainee_id: trainee_id },
        attributes: ['day_number'],
        order: [['day_number', 'DESC']],
        limit: 1,
    });
    return currentDay;
});
exports.default = getTraineeCurrentDay;
