import express,{ Request,Response } from "express";
import superAdminRegistration from "../../services/adminServices/superAdminRegistration";

const superAdminRegister = async(req:Request,res:Response)=>{
    superAdminRegistration(req,res);
}

export default superAdminRegister;