import lAnddcontroller from '../controllers/lAnddControllers/createAssessments';
import  express,{Router,Response,Request}  from "express";

const router = Router();
router.post('/CreateAssessment', async (req : Request,res : Response)=>{
    lAnddcontroller(req,res);
});

export default router;