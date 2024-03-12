
import express,{Router,Response,Request} from 'express';
import getUserList from '../controllers/superadmin/getAllUsers'
import updateTrainee from '../controllers/SuperAdmin/UpdateTraineeController'
import createBatchController from '../controllers/l_and_d/createBatchController';
import createCourseController from '../controllers/superadmin/createCourseController';
import manageBatch from '../controllers/SuperAdmin/batchManagement'
import multer from 'multer';
import adminRegistration from "../controllers/SuperAdmin/userRegistrationController";
import verifyLoginJWT from "../middlewares/verifyLoginJWT";
import fs from 'fs';

 //Multer DiskStorage Config 
 const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        let dir = `D:\ILPex\TemporaryFileStorage`;

        fs.access(dir, function(error)
        {
            if(error)
            {
                console.log('Directory does not Exist');
                return fs.mkdir(dir, error => cb(error, dir));
            }
            else
            {
                console.log('Directory Exists');
                return cb(null, dir);
            }
        });
    },
    filename : function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadFiles = multer({storage : storage});

// api endpoints related to super admin are put here
const router = Router();

router.get('/v5/getusers',verifyLoginJWT,async (req:Request,res:Response) =>{
    getUserList(req,res);//getting users list.
})

router.patch('/trainee',verifyLoginJWT,async (req:Request,res:Response) =>{
    console.log('Entered updateTrainees');
    updateTrainee(req,res);//updating users credentials.
})
router.patch('/batch',verifyLoginJWT,async (req:Request,res:Response) =>{
    console.log('Entered');
    manageBatch(req,res);//updating batch credentials.
})

router.post('/batch', verifyLoginJWT, uploadFiles.single('file'), async (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error("Please upload a file");
        return next(error);
    }
    
    req.file = file;
    createBatchController(req, res);
});


router.post("/course",verifyLoginJWT,uploadFiles.single('file'), async(req, res, next) =>{
    const file = req.file;
    if (!file) {
        const error = new Error("Please upload a file");
        return next(error);
    }
    
    req.file = file;
    console.log("Req.file", req.file)
    createCourseController(req,res);
})

//LandD registration
router.post("/admin/registration",verifyLoginJWT ,async(req:Request,res:Response)=>{
    adminRegistration(req,res);
}); 



export default router;