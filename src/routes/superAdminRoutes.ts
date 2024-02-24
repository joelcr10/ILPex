
import express,{Router,Response,Request} from 'express';
import getUserList from '../controllers/SuperAdmin/getAllUsers'
import manageUsers from '../controllers/SuperAdmin/manageUsers'
import createBatchController from '../controllers/l_and_d/createBatchController';
import createCourseController from '../controllers/admin/createCourse';
import createCourseTypeController from '../controllers/admin/createCourseType';
import manageBatch from '../controllers/SuperAdmin/batchManagement'

// api endpoints related to super admin are put here
const router = Router();


router.post('/createBatch', async(req : Request, res : Response) => {
        createBatchController(req, res);
});
router.get('/v5/getusers',async (req:Request,res:Response) =>{
    getUserList(req,res);//getting users list.
})

router.post('/manageUsers',async (req:Request,res:Response) =>{
    console.log('Entered manageUsers');
    manageUsers(req,res);//updating users credentials.
})
router.post('/manageBatches',async (req:Request,res:Response) =>{
    console.log('Entered');
    manageBatch(req,res);//updating batch credentials.
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