"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyOTPService_1 = __importDefault(require("../../services/authentication/verifyOTPService"));
const verifyOTP = (req, res) => {
    const { email, enteredOtp } = req.body;
    if (!email || !enteredOtp) {
        return res.status(500).json({ error: `All fields are required` });
    }
    const isOTPValid = (0, verifyOTPService_1.default)(email, enteredOtp);
    if (isOTPValid) {
        return res.status(200).json({ success: true, message: "OTP verification successful!" });
    }
    else {
        return res.status(400).json({ success: false, message: "Invalid OTP. Please try again." });
    }
};
exports.default = verifyOTP;
