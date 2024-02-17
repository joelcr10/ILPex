
import express,{Router,Response,Request} from 'express';
import getUserList from '../controllers/SuperAdmin/getAllUsers'
import manageUsers from '../controllers/SuperAdmin/manageUsers'
import createBatchController from '../controllers/l_and_d_controllers/createBatchController';
import createCourseController from '../controllers/admin/createCourse';
import createDaysController from '../controllers/admin/createDaysController';
import createDaywiseCourseMappingController from '../controllers/admin/createDaywiseCourseMappingController';

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

export default router;