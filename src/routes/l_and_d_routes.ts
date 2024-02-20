import { Router, Request, Response } from "express";
import getTrainess from '../controllers/l_and_d/getTrainees';
import createAssessment from '../controllers/l_and_d/createAssessments';

const router = Router();

router.get("/getTrainees", async (req: Request, res: Response) => {
    getTrainess(req, res);
});

router.post('/createAssessment', async (req : Request,res : Response)=>{
    createAssessment(req,res);
});

export default router;
