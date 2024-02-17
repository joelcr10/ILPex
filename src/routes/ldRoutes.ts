import lAnddcontroller from '../controllers/lAndDControllers/createAssessments';
import  express,{Router,Response,Request}  from "express";

const router = Router();
router.post('/CreateAssessment', async (req : Request,res : Response)=>{
    lAnddcontroller(req,res);
});

export default router;