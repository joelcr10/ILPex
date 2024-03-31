"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllUsers_1 = __importDefault(require("../controllers/SuperAdmin/getAllUsers"));
const UpdateTraineeController_1 = __importDefault(require("../controllers/SuperAdmin/UpdateTraineeController"));
const createBatchController_1 = __importDefault(require("../controllers/l_and_d/createBatchController"));
const createCourseController_1 = __importDefault(require("../controllers/SuperAdmin/createCourseController"));
const welcomeEmailController_1 = __importDefault(require("../controllers/SuperAdmin/welcomeEmailController"));
const batchManagement_1 = __importDefault(require("../controllers/SuperAdmin/batchManagement"));
const multer_1 = __importDefault(require("multer"));
const userRegistrationController_1 = __importDefault(require("../controllers/SuperAdmin/userRegistrationController"));
const verifyLoginJWT_1 = __importDefault(require("../middlewares/verifyLoginJWT"));
const fs_1 = __importDefault(require("fs"));
const getAllCourseCollectionController_1 = __importDefault(require("../controllers/l_and_d/getAllCourseCollectionController"));
//Multer DiskStorage Config 
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        let dir = `D:\ILPex\TemporaryFileStorage`;
        fs_1.default.access(dir, function (error) {
            if (error) {
                console.log('Directory does not Exist');
                return fs_1.default.mkdir(dir, error => cb(error, dir));
            }
            else {
                console.log('Directory Exists');
                return cb(null, dir);
            }
        });
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const uploadFiles = (0, multer_1.default)({ storage: storage });
// api endpoints related to super admin are put here
const router = (0, express_1.Router)();
router.get('/v5/getusers', verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getAllUsers_1.default)(req, res); //getting users list.
}));
router.patch('/trainee', verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Entered updateTrainees');
    (0, UpdateTraineeController_1.default)(req, res); //updating users credentials.
}));
router.patch('/batch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Entered');
    (0, batchManagement_1.default)(req, res); //updating batch credentials.
}));
router.post('/batch', verifyLoginJWT_1.default, uploadFiles.single('file'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        const error = new Error("Please upload a file");
        return next(error);
    }
    req.file = file;
    (0, createBatchController_1.default)(req, res);
}));
//adding new courses to DB
router.post("/course", verifyLoginJWT_1.default, uploadFiles.single('file'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        const error = new Error("Please upload a file");
        return next(error);
    }
    req.file = file;
    console.log("Req.file", req.file);
    (0, createCourseController_1.default)(req, res);
}));
//LandD registration
router.post("/admin/registration", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, userRegistrationController_1.default)(req, res);
}));
//Welcome email after L&D registration
router.post("/admin/email/welcome", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, welcomeEmailController_1.default)(req, res);
}));
router.get('/batch/:batch_id/course/names', verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getAllCourseCollectionController_1.default)(req, res); //getting users list.
}));
exports.default = router;
