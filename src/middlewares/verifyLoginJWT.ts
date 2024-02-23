 // Middleware to verify JWT token and attach decoded data to the request body
 import jwt from 'jsonwebtoken';
 import { Request, Response, NextFunction } from "express";
 import dotenv from "dotenv";



 dotenv.config();

const { JWTTOKENCODE } = process.env as { JWTTOKENCODE: string | undefined };


 const verifyLoginJWT = (req: Request, res: Response, next:NextFunction) => {
    let token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }
    token = token?.split("Bearer ")[1];
    console.log(token);
  
    //verify the token
    if(JWTTOKENCODE){
      jwt.verify(token as string, JWTTOKENCODE,(err, decoded) => {
        if (err) {
          return res.status(401).json({ error: err });
        }
    
        //attach the decoded payload to the request object for further use
        req.body.jwt_decoded = decoded;
        
        next();
      });
    }
    else {
      console.error(
        "Unable to sign the token. Check if JWTTOKENCODE and userFound are defined."
      );

  };

}


export default verifyLoginJWT;