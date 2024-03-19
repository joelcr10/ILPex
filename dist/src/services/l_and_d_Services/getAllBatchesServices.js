"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const batches_1 = tslib_1.__importDefault(require("../../models/batches"));
const getTraineesCount_1 = tslib_1.__importDefault(require("./getTraineesCount"));
const calculateProgress = (start, end) => {
    const currentDate = new Date();
    if (currentDate < start) {
        return 0;
    }
    if (currentDate > end) {
        return 100;
    }
    const totalDuration = end.getTime() - start.getTime();
    const elapsedDuration = currentDate.getTime() - start.getTime();
    const progressPercentage = (elapsedDuration / totalDuration) * 100;
    return Math.min(progressPercentage, 100);
};
const getAllBatch = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const batch_details = yield batches_1.default.findAll({
        attributes: ['batch_id', 'batch_name', 'start_date', 'end_date', 'isActive'],
    });
    const batchDetailsWithProgress = yield Promise.all(batch_details.map((batch) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { batch_id, batch_name, start_date, end_date, isActive } = batch;
        const progress = calculateProgress(new Date(start_date), new Date(end_date));
        const noOfTrainees = yield (0, getTraineesCount_1.default)(batch_id);
        return {
            batch_id,
            batch_name,
            start_date,
            end_date,
            isActive,
            progress,
            noOfTrainees,
        };
    })));
    return batchDetailsWithProgress;
});
exports.default = getAllBatch;
