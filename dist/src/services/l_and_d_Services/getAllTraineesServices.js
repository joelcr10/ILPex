"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const batches_1 = tslib_1.__importDefault(require("../../models/batches"));
const trainees_1 = tslib_1.__importDefault(require("../../models/trainees"));
const users_1 = tslib_1.__importDefault(require("../../models/users"));
const getAllTraineesServices = (offset, sortKey, sortOrder, batchId // Optional batchId parameter
) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const queryOptions = {
        include: [
            {
                // Join Batches model
                model: batches_1.default,
                required: true,
                attributes: ['batch_name']
            },
            {
                // Join User model
                model: users_1.default,
                required: true,
                attributes: ['user_name']
            },
        ],
        order: [[sortKey, sortOrder]],
        offset: offset,
        attributes: ['trainee_id', 'user_id', 'batch_id'],
    };
    // Apply batch_id filter if provided
    if (batchId !== 0) {
        queryOptions.where = { batch_id: batchId };
    }
    const trainees = yield trainees_1.default.findAll(queryOptions);
    return trainees;
});
exports.default = getAllTraineesServices;
