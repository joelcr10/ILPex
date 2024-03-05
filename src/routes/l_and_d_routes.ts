import { Router, Request, Response } from "express";
import getTrainess from '../controllers/l_and_d/getTraineesController';
import createAssessmentController from "../controllers/l_and_d/createAssessmentsController";
import updateAssessmentController from "../controllers/l_and_d/updateAssessmentsController";import getBatchDetails from "../controllers/l_and_d/getBatchDetailsController";
import getAllAsssessment from "../controllers/l_and_d/getAllAssessmentsController";
import batchCourseAnalysisController from "../controllers/l_and_d/batchCourseAnalysisController";
import batchAverage from "../controllers/l_and_d/batchAverageScore";
import sendMail from "../services/l_and_d_Services/sendMail";
import getAssessmentDetails from "../controllers/l_and_d/getAssessmentDetailsController";
import traineeScore from "../controllers/l_and_d/traineeScoreController";
import batchDayWiseProgressController from "../controllers/l_and_d/batchDayWiseProgressController";
import batchDayWiseCourseAnalysisController from "../controllers/l_and_d/batchDayWiseCourseAnalysisController";
import getAllBatches from "../controllers/l_and_d/getAllBatchesController";

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
router.get('/batch/:batch_id/progress',async(req:Request,res:Response)=>{
    batchDayWiseProgressController(req,res);
})
router.get("/batch/:batch_id", async (req: Request, res: Response) => {
    getBatchDetails(req, res);
});

router.get("/batch", async (req: Request, res: Response) => {
    getAllBatches(req, res);
});

router.get("/assessment/:assessment_id", async (req: Request, res: Response) => {
    getAssessmentDetails(req, res);
});

router.get("/assessment", async (req: Request, res: Response) => {
    getAllAsssessment(req, res);
});
router.get('/batch/:id',async (req:Request,res:Response)=>{
    batchAverage(req,res);
});

router.get('/sendMail', async(req: Request, res: Response) =>{
    sendMail(res);
});

router.get('/analysis/:batch_id', async(req : Request, res : Response) => {
    batchCourseAnalysisController(req, res);
});

router.get('/trainee/:trainee_id/scores', async(req: Request, res: Response) =>{
    traineeScore(req,res);
})

router.get('/analysis/:batch_id/:day_id', async(req : Request, res : Response) => {
    batchDayWiseCourseAnalysisController(req, res);
})

export default router;
