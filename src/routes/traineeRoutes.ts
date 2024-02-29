import { Router, Request, Response } from "express";
 import getAssessments from "../controllers/trainee/getAssessments";
import getDaywiseCourseController from "../controllers/trainee/getDaywiseCourseController";
import getQuestionsForAssessment from "../controllers/trainee/getQuestionsForAssessment";
import updateScore from "../controllers/trainee/updateScore";
import percipioReportController from "../controllers/trainee/getPercipioData";

const router = Router();

router.get("/getAssessments", async (req: Request, res: Response) => {
    getAssessments(req, res);
});


router.get("/course/day/:id", async (req: Request, res: Response) =>{
    await getDaywiseCourseController(req,res);
})

router.get("/getQuestions", async (req: Request, res: Response) => {
    getQuestionsForAssessment(req, res);
});

router.post("/updateScore", async (req: Request, res: Response) => {
    updateScore(req, res);
});

router.post("/percipio", async(req: Request, res: Response) =>{
    percipioReportController(req,res);
})

export default router;