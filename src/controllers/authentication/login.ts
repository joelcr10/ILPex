import express,{ Request,Response } from "express";
import userLogin from "../../services/adminServices/userLogin";

const login = async(req:Request,res:Response)=>{
    userLogin(req,res);
}

export default login;