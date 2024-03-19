"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const users_1 = tslib_1.__importDefault(require("../../../models/users"));
const getUserByUserIdServices = (user_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield users_1.default.findOne({ where: { user_id: user_id } });
    return findUser;
});
exports.default = getUserByUserIdServices;
