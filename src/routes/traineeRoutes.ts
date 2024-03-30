import { Router, Request, Response } from "express";
import getAssessments from "../controllers/trainee/getAssessments";
import getDaywiseCourseController from "../controllers/trainee/getDaywiseCourseController";
import getQuestionsForAssessment from "../controllers/trainee/getQuestionsForAssessment";
import updateScore from "../controllers/trainee/updateScore";
import percipioReportController from "../controllers/trainee/getPercipioData";
import daywiseTracking from "../controllers/trainee/daywiseTracking";
import getProfile from "../controllers/trainee/getProfileController";
import dayCardController from "../controllers/trainee/dayCardController";
import findCurrentDayController from "../controllers/l_and_d/findCurrentDayController";
import verifyLoginJWT from "../middlewares/verifyLoginJWT";
import percipioAssessmentController from "../controllers/trainee/percipioAssessmentController";
import getTraineeDurationController from "../controllers/trainee/getTraineeDurationController";
import findTraineeCurrentDayController from "../controllers/trainee/findTraineeCurrentDayController";
const router = Router();

router.get("/:id/assessment",verifyLoginJWT, async (req: Request, res: Response) => {
    getAssessments(req, res);
});


router.get("/course/batch/:batch_id/day/:id",verifyLoginJWT, async (req: Request, res: Response) =>{
    await getDaywiseCourseController(req,res);
})

router.get("/assessment/:id",verifyLoginJWT, async (req: Request, res: Response) => {
    getQuestionsForAssessment(req, res);
});

router.post("/assessment",verifyLoginJWT, async (req: Request, res: Response) => {
    updateScore(req, res);
});

router.post("/percipio",verifyLoginJWT, async(req: Request, res: Response) =>{
    percipioReportController(req,res);
})

router.get("/trainee/:trainee_id/course/day/:day_number",verifyLoginJWT, async(req: Request, res: Response) =>{
    daywiseTracking(req,res);
})

router.get("/profile/:user_id",verifyLoginJWT, async(req: Request, res: Response) =>{
    getProfile(req,res);
})

router.get("/trainee/:trainee_id/days",verifyLoginJWT, async(req: Request, res: Response) =>{
    dayCardController(req,res);
})

router.get('/batch/:batch_id/day/:current_date',verifyLoginJWT, async(req : Request, res : Response) => {
    findCurrentDayController(req, res);
})

router.post("/percipio/assessment", verifyLoginJWT, async(req: Request, res: Response) =>{
    percipioAssessmentController(req,res);
})


router.get("/trainee/:user_id/duration", async (req: Request, res: Response) =>{
    getTraineeDurationController(req,res);
})

router.get("/trainee/:trainee_id/currentday",verifyLoginJWT, async (req: Request, res: Response) => {
    findTraineeCurrentDayController(req, res);
});


export default router;