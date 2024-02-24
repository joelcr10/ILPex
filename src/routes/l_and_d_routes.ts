import { Router, Request, Response } from "express";
import getTrainess from '../controllers/l_and_d/getTraineesController';
import createAssessmentController from "../controllers/l_and_d/createAssessments";
import updateAssessmentController from "../controllers/l_and_d/updateAssessments";import getBatchDetails from "../controllers/l_and_d/getBatchDetailsController";
import getAllAsssessment from "../controllers/l_and_d/getAllAssessmentsController";

const router = Router();

router.get("/getTrainees", async (req: Request, res: Response) => {
    getTrainess(req, res);
});

router.post('/createAssessment', async (req : Request,res : Response)=>{
    createAssessmentController(req,res);
});
router.post('/updateassessment',async (req:Request,res:Response)=>{
    updateAssessmentController(req,res);
});


router.get("/getBatchDetails", async (req: Request, res: Response) => {
    getBatchDetails(req, res);
});

router.get("/getAllAsssessment", async (req: Request, res: Response) => {
    getAllAsssessment(req, res);
});

export default router;
