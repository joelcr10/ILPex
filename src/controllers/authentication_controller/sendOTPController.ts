import { Request, Response } from "express";
import { sendOTPByEmail } from "../../services/authentication/sendOTPByEmailService";

const sendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    if(!email){
      return res.status(500).json({error: "All fields are required"});
    }
    const isSent = await sendOTPByEmail(email);
    if (isSent) {
     return res.status(200).json({message: "OTP sent successfully!"});
    } else {
     return res.status(500).json({error: "Failed to send OTP. Check if email is valid"});
    }
  } catch (error) {
    return res.status(500).json({error:`Internal server error ${error}`});
  }
};

export default sendOTP;


