"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const roles_1 = tslib_1.__importDefault(require("../../../models/roles"));
const getUserByRoleNameServices = (Role) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const findRole = yield roles_1.default.findOne({ where: { role_name: Role } });
    return findRole;
});
exports.default = getUserByRoleNameServices;
