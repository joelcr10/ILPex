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
Object.defineProperty(exports, "__esModule", { value: true });
const sendOTPByEmailService_1 = require("../../services/authentication/sendOTPByEmailService");
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(500).json({ error: "All fields are required" });
        }
        const isSent = yield (0, sendOTPByEmailService_1.sendOTPByEmail)(email);
        if (isSent) {
            return res.status(200).json({ message: "OTP sent successfully!" });
        }
        else {
            return res.status(500).json({ error: "Failed to send OTP. Check if email is valid" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: `Internal server error ${error}` });
    }
});
exports.default = sendOTP;
