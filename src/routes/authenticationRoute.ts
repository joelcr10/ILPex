//end points related to authentication

import { Router,Request,Response } from "express";
import login from "../controllers/authenticationController/loginController";
import resetPassword from "../controllers/authenticationController/resetPasswordController";
import verifyOTP from "../controllers/authenticationController/VerifyOTPController";
import sendOTP from "../controllers/authenticationController/sendOTPController";

const router = Router();

router.post("/authentication/login", async(req:Request,res:Response)=>{
    login(req,res);
}); 


router.post("/authentication/resetPassword", async(req:Request, res:Response)=>{
    resetPassword(req,res);
})

router.post("/authentication/verification", async (req: Request, res: Response) => {
    verifyOTP(req, res);
  });

router.post("/authentication/verification/OTP", async (req: Request, res: Response) => {
    sendOTP(req, res);
});


export default router;