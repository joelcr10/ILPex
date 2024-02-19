//end points related to authentication

import { Router,Request,Response } from "express";
// import userLogin from "../controllers/authentication/login";
import userRegistration from "../controllers/authentication/register";
import verifyLoginJWT from "../middlewares/verifyLoginJWT";

const router = Router();

router.post("/userRegistration",verifyLoginJWT ,async(req:Request,res:Response)=>{
    userRegistration(req,res);
}); 

// router.post("/userLogin", async(req:Request,res:Response)=>{
//     userLogin(req,res);
// }); 

export default router;