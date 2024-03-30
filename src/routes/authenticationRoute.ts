//end points related to authentication
import { Router,Request,Response } from "express";
import login from "../controllers/authentication_controller/loginController";
import resetPassword from "../controllers/authentication_controller/resetPasswordController";
import verifyOTP from "../controllers/authentication_controller/VerifyOTPController";
import sendOTP from "../controllers/authentication_controller/sendOTPController";

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

router.post("/authentication/forgotpassword", async (req: Request, res: Response) => {
    sendOTP(req, res);
});

export default router;