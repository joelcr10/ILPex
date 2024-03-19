"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const batches_1 = tslib_1.__importDefault(require("../../models/batches"));
const trainees_1 = tslib_1.__importDefault(require("../../models/trainees"));
const users_1 = tslib_1.__importDefault(require("../../models/users"));
const getTraineeDetails = (user_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const trainee = yield users_1.default.findOne({
        include: [
            {
                //Join Trainee table 
                model: trainees_1.default,
                required: false,
                attributes: ['trainee_id', 'user_id', 'batch_id', 'isActive'],
                include: [
                    {
                        //Join Batch Table 
                        model: batches_1.default,
                        attributes: ['batch_name'],
                    },
                ],
            },
        ],
        // attributes:['trainee_id','user_id','batch_id','isActive'],
        where: { user_id: user_id },
        attributes: ['user_name', 'email', 'percipio_email', 'role_id'],
    });
    return trainee;
});
exports.default = getTraineeDetails;
