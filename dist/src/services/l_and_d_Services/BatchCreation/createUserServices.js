"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const users_1 = tslib_1.__importDefault(require("../../../models/users"));
const createUserServices = (Name, Role, Email, Percipio_Email, Password, roleId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const findDuplicateUser = yield users_1.default.findOne({ where: { email: Email } });
    if (findDuplicateUser) {
        return false;
    }
    else {
        const createUser = yield users_1.default.create({
            user_name: Name,
            email: Email,
            percipio_email: Percipio_Email,
            password: Password,
            role_id: roleId,
        });
        return createUser;
    }
});
exports.default = createUserServices;
