"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const users_1 = tslib_1.__importDefault(require("../../../models/users"));
const findDuplicateTraineeServices = (Email) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const findDuplicateService = yield users_1.default.findOne({ where: { email: Email } });
    return findDuplicateService;
});
exports.default = findDuplicateTraineeServices;
