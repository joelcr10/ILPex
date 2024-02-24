
import express,{Router,Response,Request} from 'express';
import getUserList from '../controllers/superadmin/getAllUsers'
import manageUsers from '../controllers/superadmin/manageUsers'
import createBatchController from '../controllers/l_and_d/createBatchController';
import createCourseController from '../controllers/superadmin/createCourseController';
import createCourseTypeController from '../controllers/superadmin/createCourseTypeController';

// api endpoints related to super admin are put here
const router = Router();


router.post('/createBatch', async(req : Request, res : Response) => {
        createBatchController(req, res);
});
router.get('/v5/getusers',async (req:Request,res:Response) =>{
    getUserList(req,res);//getting users list.
})

router.post('/v6/manageUsers',async (req:Request,res:Response) =>{
    manageUsers(req,res);//updating users credentials.
})

router.post('/createBatch', async(req : Request, res : Response) => {
    createBatchController(req, res);
})

router.post("/createCourse", async(req: Request,res: Response) =>{
    await createCourseController(req,res);
})

router.post('/createCourseType', async(req: Request, res: Response) =>{
    await createCourseTypeController(req,res);
})



export default router;