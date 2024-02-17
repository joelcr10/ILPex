import { Router, Request, Response } from "express";
import getAssessments from "../controllers/trainee/getAssessments";
import getQuestionsForAssessment from "../controllers/trainee/getQuestionsForAssessment";


const router = Router();

router.get("/getAssessments", async (req: Request, res: Response) => {
    getAssessments(req, res);
});

router.get("/getQuestions", async (req: Request, res: Response) => {
    getQuestionsForAssessment(req, res);
});
export default router;