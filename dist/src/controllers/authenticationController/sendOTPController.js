"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sendOTPByEmailService_1 = require("../../services/authentication/sendOTPByEmailService");
const sendOTP = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
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
