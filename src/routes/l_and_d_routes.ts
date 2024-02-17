import { Router, Request, Response } from "express";
import getTrainess from '../controllers/l_and_d_controllers/getTrainees';
import lAnddcontroller from '../controllers/l_and_d_controllers/createAssessments';

const router = Router();

router.get("/getTrainees", async (req: Request, res: Response) => {
    getTrainess(req, res);
});

router.post('/CreateAssessment', async (req : Request,res : Response)=>{
    lAnddcontroller(req,res);
});

export default router;
