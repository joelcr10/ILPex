import { Request, Response } from "express";
import verifyOTPService from "../../services/authentication/verifyOTPService"

const verifyOTP = (req: Request, res: Response) => {
  const { email, enteredOtp } = req.body;
  if(!email||!enteredOtp){
    return res.status(500).json({error: `All fields are required`})
  }
  const isOTPValid = verifyOTPService(email, enteredOtp);
  if (isOTPValid) {
   return res.status(200).json({ success: true, message: "OTP verification successful!" });
  } else {
   return res.status(400).json({ success: false, message: "Invalid OTP. Please try again." });
  }
};

export default verifyOTP;
