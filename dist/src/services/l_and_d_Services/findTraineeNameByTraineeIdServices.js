"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trainees_1 = tslib_1.__importDefault(require("../../models/trainees"));
const users_1 = tslib_1.__importDefault(require("../../models/users"));
const findTraineeNameByTraineeIdServices = (trainee_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield trainees_1.default.findOne({ where: { trainee_id: trainee_id } });
    if (findUser) {
        const userName = yield users_1.default.findOne({ where: { user_id: findUser.user_id } });
        if (userName)
            return userName.user_name;
    }
});
exports.default = findTraineeNameByTraineeIdServices;
