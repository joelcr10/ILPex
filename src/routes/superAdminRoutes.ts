
import express,{Router,Response,Request} from 'express';
import getUserList from '../controllers/getAllUsers'
import createCourseController from '../controllers/admin/createCourse';

// api endpoints related to super admin are put here
const router = Router();
router.get('/getusers',async (req:Request,res:Response) =>{
    console.log("inside routes")
    getUserList(req,res);
})


router.post('/createCourse', async (req: Request, res: Response) =>{
    await createCourseController(req,res);
})

export default router;