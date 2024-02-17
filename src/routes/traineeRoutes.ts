// api endpoints related to trainee are put here
import { Router, Request, Response } from "express";
import getAssessments from "../controllers/trainee/getAssessments";
import getDaywiseCourseController from "../controllers/trainee/getDaywiseCourse";


const router = Router();

router.post("/getAssessments", async (req: Request, res: Response) => {
    getAssessments(req, res);
});


router.get("/getDaywiseCourse", async (req: Request, res: Response) =>{
    await getDaywiseCourseController(req,res);
})

export default router;