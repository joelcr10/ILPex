"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const roles_1 = tslib_1.__importDefault(require("../../../models/roles"));
const superAdminPrivilegesServices = (role_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const checkForSuperAdminprivileges = yield roles_1.default.findOne({ where: { role_id: role_id } });
    return checkForSuperAdminprivileges;
});
exports.default = superAdminPrivilegesServices;
