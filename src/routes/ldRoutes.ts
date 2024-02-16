import { Router, Request, Response } from "express";
import getAssessments from "../controllers/trainee/getAssessments";


const router = Router();

router.post("/getAssessments", async (req: Request, res: Response) => {
    getAssessments(req, res);
});

export default router;
