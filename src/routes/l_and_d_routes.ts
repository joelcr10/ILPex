import { Router, Request, Response } from "express";
import getTrainess from '../controllers/l_and_d/getTrainees';
import createAssessmentController from "../controllers/l_and_d/createAssessments";
import updateAssessmentController from "../controllers/l_and_d/updateAssessments";
const router = Router();

router.get("/getTrainees", async (req: Request, res: Response) => {
    getTrainess(req, res);
});

router.post('/createAssessment', async (req : Request,res : Response)=>{
    createAssessmentController(req,res);
});
router.patch('/updateAssessment',async (req:Request,res:Response)=>{
    updateAssessmentController(req,res);
});

export default router;
