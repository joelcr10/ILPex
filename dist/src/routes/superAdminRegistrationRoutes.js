"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const superAdminRegister_1 = tslib_1.__importDefault(require("../controllers/authenticationController/superAdminRegister"));
const router = (0, express_1.Router)();
router.post("/superAdminRegistration", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, superAdminRegister_1.default)(req, res);
}));
exports.default = router;
