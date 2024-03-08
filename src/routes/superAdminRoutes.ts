
import express,{Router,Response,Request} from 'express';
import getUserList from '../controllers/superadmin/getAllUsers'
import manageUsers from '../controllers/superadmin/manageUsers'
import createBatchController from '../controllers/l_and_d/createBatchController';
import createCourseController from '../controllers/superadmin/createCourseController';
import manageBatch from '../controllers/SuperAdmin/batchManagement'
import multer from 'multer';
import adminRegistration from "../controllers/SuperAdmin/userRegistrationController";
import verifyLoginJWT from "../middlewares/verifyLoginJWT";

 //Multer DiskStorage Config 
 const diskStorage = multer.diskStorage(
    { destination: 'D:\ILPex\TemporaryFileStorage'} );

const upload = multer({ storage: diskStorage });

// api endpoints related to super admin are put here
const router = Router();


router.post('/createBatch',verifyLoginJWT, async(req : Request, res : Response) => {
        createBatchController(req, res);
});
router.get('/v5/getusers',verifyLoginJWT,async (req:Request,res:Response) =>{
    getUserList(req,res);//getting users list.
})

router.patch('/user',verifyLoginJWT,async (req:Request,res:Response) =>{
    console.log('Entered manageUsers');
    manageUsers(req,res);//updating users credentials.
})
router.patch('/batch',verifyLoginJWT,async (req:Request,res:Response) =>{
    console.log('Entered');
    manageBatch(req,res);//updating batch credentials.
})

router.post('/batch',verifyLoginJWT, async(req : Request, res : Response) => {
    createBatchController(req, res);
})

router.post("/course",upload.single('course'),verifyLoginJWT, async(req: any,res: Response) =>{
    await createCourseController(req,res);
})

//LandD registration
router.post("/admin/registration",verifyLoginJWT ,async(req:Request,res:Response)=>{
    adminRegistration(req,res);
}); 



export default router;