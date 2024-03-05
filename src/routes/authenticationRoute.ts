//end points related to authentication

import { Router,Request,Response } from "express";
import login from "../controllers/authenticationController/loginController";


const router = Router();

router.post("/authentication/login", async(req:Request,res:Response)=>{
    login(req,res);
}); 

export default router;