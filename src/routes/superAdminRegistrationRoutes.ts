import { Router, Request, Response } from "express";
import superAdminRegister from "../controllers/authentication_controller/superAdminRegister";


const router = Router();

router.post("/superAdminRegistration", async (req: Request, res: Response) => {
    superAdminRegister(req, res);
});

export default router;