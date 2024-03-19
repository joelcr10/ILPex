"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const superAdminRegistration_1 = tslib_1.__importDefault(require("../../services/adminservices/superAdminRegistration"));
const superAdminRegister = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, superAdminRegistration_1.default)(req, res);
});
exports.default = superAdminRegister;
