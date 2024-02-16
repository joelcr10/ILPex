import { Router,Request,Response } from "express";
import createBatchController from "../controllers/lAndDControllers/createBatchController";

const router = Router();

const createBatchControllerrouter = async(req : Request, res : Response) => {
    createBatchController(req, res);
}

router.post("/createBatch", async(req:Request,res:Response) => {
    createBatchControllerrouter(req, res);
}); 


export default router;
