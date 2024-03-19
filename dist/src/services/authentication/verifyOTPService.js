"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendOTPByEmailService_1 = require("./sendOTPByEmailService");
const verifyOTPService = (email, enteredOtp) => {
    // Retrieve the stored OTP for the given email
    const storedOTP = sendOTPByEmailService_1.otpStorage[email];
    // Check if the stored OTP exists and matches the user-entered OTP
    if (storedOTP && storedOTP === enteredOtp) {
        // If matched, remove the OTP from storage (optional)
        delete sendOTPByEmailService_1.otpStorage[email];
        return true;
    }
    else {
        return false;
    }
};
exports.default = verifyOTPService;
