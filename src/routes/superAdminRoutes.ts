
import express,{Router,Response,Request} from 'express';
import getUserList from '../controllers/getAllUsers'
import manageUsers from '../controllers/manageUsers'
// api endpoints related to super admin are put here
const router = Router();
router.get('/getusers',async (req:Request,res:Response) =>{
    getUserList(req,res);
})
router.post('/manageusers',async(req:Request,res:Response) =>{
    manageUsers(req,res);
})

export default router;