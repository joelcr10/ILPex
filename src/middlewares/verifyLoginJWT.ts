 // Middleware to verify JWT token and attach decoded data to the request body
 import jwt from 'jsonwebtoken';
 import { Request, Response, NextFunction } from "express";


 const verifyLoginJWT = (req: Request, res: Response, next:NextFunction) => {
    let token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }
    token = token?.split("Bearer ")[1];
    console.log(token);
  
    //verify the token
    jwt.verify(token as string, "verify_login",(err, decoded) => {
      if (err) {
        return res.status(401).json({ error: err });
      }
  
      //attach the decoded payload to the request object for further use
      req.body.jwt_decoded = decoded;
      
      next();
    });
  };


export default verifyLoginJWT;