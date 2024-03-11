import nodemailer from "nodemailer";
import Users from "../../models/users";
import {otpStorage} from "./sendOTPByEmailService"



const verifyOTPService = (email: string, userEnteredOTP: string): boolean => {

    // Retrieve the stored OTP for the given email
  const storedOTP = otpStorage[email];

  // Check if the stored OTP exists and matches the user-entered OTP
  if (storedOTP && storedOTP === userEnteredOTP) {
    // If matched, remove the OTP from storage (optional)
    delete otpStorage[email];
    return true;
  } else {
    return false;
  }


}

export default verifyOTPService;