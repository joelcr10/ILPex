import express,{ Request,Response } from "express";
import userRegistration from "../../services/adminServices/userRegistration";

const register = async(req:Request,res:Response)=>{
    userRegistration(req,res);
}

export default register;