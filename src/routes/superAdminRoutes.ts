
import express,{Router,Response,Request} from 'express';
import getUserList from '../controllers/getAllUsers'
import createBatchController from '../controllers/lAndDControllers/createBatchController';

// api endpoints related to super admin are put here
const router = Router();

router.get('/getusers',async (req:Request,res:Response) =>{
    console.log("inside routes")
    getUserList(req,res);
})

router.post('/createBatch', async(req : Request, res : Response) => {
    createBatchController(req, res);
})

export default router;