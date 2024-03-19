"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainee_progress_1 = tslib_1.__importDefault(require("../../models/trainee_progress"));
const individualTraineeProgress = (trainee_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const progress = yield trainee_progress_1.default.findAll({
            where: { trainee_id: trainee_id },
            order: [
                ['day_number', 'DESC'],
            ]
        });
        return progress;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.default = individualTraineeProgress;
