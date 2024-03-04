import { Router, Request, Response } from "express";
import getTrainess from '../controllers/l_and_d/getTraineesController';
import createAssessmentController from "../controllers/l_and_d/createAssessmentsController";
import updateAssessmentController from "../controllers/l_and_d/updateAssessmentsController";import getBatchDetails from "../controllers/l_and_d/getBatchDetailsController";
import getAllAsssessment from "../controllers/l_and_d/getAllAssessmentsController";

import batchAverage from "../controllers/l_and_d/batchAverageScore";
import sendMail from "../services/l_and_d_Services/sendMail";
import batchDayWiseProgressController from "../controllers/l_and_d/batchDayWiseProgressController";

const router = Router();

router.get("/trainee", async (req: Request, res: Response) => {
    getTrainess(req, res);
});

router.post('/assessment', async (req : Request,res : Response)=>{
    createAssessmentController(req,res);
});
router.patch('/assessment',async (req:Request,res:Response)=>{
    updateAssessmentController(req,res);
});
router.get('/batch/:batch_id/:day_id',async(req:Request,res:Response)=>{
    batchDayWiseProgressController(req,res);
})
router.get("/batch/:batch_id", async (req: Request, res: Response) => {
    getBatchDetails(req, res);
});

router.get("/assessment", async (req: Request, res: Response) => {
    getAllAsssessment(req, res);
});
router.get('/batch/:id',async (req:Request,res:Response)=>{
    batchAverage(req,res);
});

router.get('/sendMail', async(req: Request, res: Response) =>{
    sendMail(res);
})

export default router;
