import { Router, Request, Response } from "express";
 import getAssessments from "../controllers/trainee/getAssessments";
import getDaywiseCourseController from "../controllers/trainee/getDaywiseCourse";
import getQuestionsForAssessment from "../controllers/trainee/getQuestionsForAssessment";


const router = Router();

router.get("/getAssessments", async (req: Request, res: Response) => {
    getAssessments(req, res);
});


router.get("/getDaywiseCourse", async (req: Request, res: Response) =>{
    await getDaywiseCourseController(req,res);
})

router.get("/getQuestions", async (req: Request, res: Response) => {
    getQuestionsForAssessment(req, res);
});

export default router;