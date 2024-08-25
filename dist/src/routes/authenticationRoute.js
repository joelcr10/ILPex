"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//end points related to authentication
const express_1 = require("express");
const loginController_1 = __importDefault(require("../controllers/authentication_controller/loginController"));
const resetPasswordController_1 = __importDefault(require("../controllers/authentication_controller/resetPasswordController"));
const VerifyOTPController_1 = __importDefault(require("../controllers/authentication_controller/VerifyOTPController"));
const sendOTPController_1 = __importDefault(require("../controllers/authentication_controller/sendOTPController"));
const router = (0, express_1.Router)();
router.get("/health-check", (req, res) => {
    res.status(200).json({ status: "UP" });
});
router.post("/authentication/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, loginController_1.default)(req, res);
}));
router.post("/authentication/resetPassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resetPasswordController_1.default)(req, res);
}));
router.post("/authentication/verification", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, VerifyOTPController_1.default)(req, res);
}));
router.post("/authentication/forgotpassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendOTPController_1.default)(req, res);
}));
exports.default = router;
