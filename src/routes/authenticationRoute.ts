//end points related to authentication

import { Router,Request,Response } from "express";
import login from "../controllers/authenticationController/loginController";
import resetPassword from "../controllers/authenticationController/resetPasswordController";


const router = Router();

router.post("/authentication/login", async(req:Request,res:Response)=>{
    login(req,res);
}); 


router.post("/authentication/resetPassword", async(req:Request, res:Response)=>{
    resetPassword(req,res);
})

export default router;