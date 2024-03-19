"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
//end points related to authentication
const express_1 = require("express");
const loginController_1 = tslib_1.__importDefault(require("../controllers/authenticationController/loginController"));
const resetPasswordController_1 = tslib_1.__importDefault(require("../controllers/authenticationController/resetPasswordController"));
const VerifyOTPController_1 = tslib_1.__importDefault(require("../controllers/authenticationController/VerifyOTPController"));
const sendOTPController_1 = tslib_1.__importDefault(require("../controllers/authenticationController/sendOTPController"));
const router = (0, express_1.Router)();
router.post("/authentication/login", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, loginController_1.default)(req, res);
}));
router.post("/authentication/resetPassword", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, resetPasswordController_1.default)(req, res);
}));
router.post("/authentication/verification", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, VerifyOTPController_1.default)(req, res);
}));
router.post("/authentication/forgotpassword", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, sendOTPController_1.default)(req, res);
}));
exports.default = router;
