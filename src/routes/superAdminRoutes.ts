
import express,{Router,Response,Request} from 'express';
import getUserList from '../controllers/getAllUsers'
import createBatchController from '../controllers/lAndDControllers/createBatchController';
import createCourseController from '../controllers/admin/createCourse';
import createDaysController from '../controllers/admin/createDaysController';
import createDaywiseCourseMappingController from '../controllers/admin/createDaywiseCourseMappingController';

// api endpoints related to super admin are put here
const router = Router();



router.post('/createBatch', async(req : Request, res : Response) => {
        createBatchController(req, res);
});
router.get('/getusers',async (req:Request,res:Response) =>{
    console.log("inside routes")
    getUserList(req,res);
})

// router.post('/createUser', async(req : Request, res : Response) => {
//     // createBatchContollerRouter(req, res);
// })


router.post('/createCourse', async (req: Request, res: Response) =>{
    await createCourseController(req,res);
})


//just to create a Day table with day_id and Day_name
router.post('/createDays', async (req: Request, res: Response) =>{
    await createDaysController(req, res);
})

router.post('/createCourseMapping', async (req, res) =>{
    await createDaywiseCourseMappingController(req,res);
})

export default router;