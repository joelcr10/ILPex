"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const roles_1 = tslib_1.__importDefault(require("../../../models/roles"));
const findRoleService = (user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const role = yield roles_1.default.findOne({ where: { role_id: user.role_id } });
    return role;
});
exports.default = findRoleService;
