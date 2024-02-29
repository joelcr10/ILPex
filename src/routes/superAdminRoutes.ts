
import express,{Router,Response,Request} from 'express';
import getUserList from '../controllers/superadmin/getAllUsers'
import manageUsers from '../controllers/superadmin/manageUsers'
import createBatchController from '../controllers/l_and_d/createBatchController';
import createCourseController from '../controllers/superadmin/createCourseController';
import createCourseTypeController from '../controllers/superadmin/createCourseTypeController';
import manageBatch from '../controllers/SuperAdmin/batchManagement'
import multer from 'multer';
import fs from 'fs';
 //Multer DiskStorage Config 
 const diskStorage = multer.diskStorage(
    { destination: 'D:\ILPex\TemporaryFileStorage'} );

const upload = multer({ storage: diskStorage });

// api endpoints related to super admin are put here
const router = Router();


router.post('/createBatch', async(req : Request, res : Response) => {
        createBatchController(req, res);
});
router.get('/v5/getusers',async (req:Request,res:Response) =>{
    getUserList(req,res);//getting users list.
})

router.patch('/user/manage',async (req:Request,res:Response) =>{
    console.log('Entered manageUsers');
    manageUsers(req,res);//updating users credentials.
})
router.patch('/batch/manage',async (req:Request,res:Response) =>{
    console.log('Entered');
    manageBatch(req,res);//updating batch credentials.
})

router.post('/createBatch', async(req : Request, res : Response) => {
    createBatchController(req, res);
})

router.post("/course",upload.single('course'), async(req: any,res: Response) =>{
    
    await createCourseController(req,res);
})

router.post('/createCourseType', async(req: Request, res: Response) =>{
    await createCourseTypeController(req,res);
})



export default router;