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
const getTraineesController_1 = __importDefault(require("../controllers/l_and_d/getTraineesController"));
const createAssessmentsController_1 = __importDefault(require("../controllers/l_and_d/createAssessmentsController"));
const updateAssessmentsController_1 = __importDefault(require("../controllers/l_and_d/updateAssessmentsController"));
const getBatchDetailsController_1 = __importDefault(require("../controllers/l_and_d/getBatchDetailsController"));
const getAllAssessmentsController_1 = __importDefault(require("../controllers/l_and_d/getAllAssessmentsController"));
const batchCourseAnalysisController_1 = __importDefault(require("../controllers/l_and_d/batchCourseAnalysisController"));
const batchAverageScore_1 = __importDefault(require("../controllers/l_and_d/batchAverageScore"));
const getAssessmentDetailsController_1 = __importDefault(require("../controllers/l_and_d/getAssessmentDetailsController"));
const traineeScoreController_1 = __importDefault(require("../controllers/l_and_d/traineeScoreController"));
const batchDayWiseProgressController_1 = __importDefault(require("../controllers/l_and_d/batchDayWiseProgressController"));
const batchDayWiseCourseAnalysisController_1 = __importDefault(require("../controllers/l_and_d/batchDayWiseCourseAnalysisController"));
const getAllBatchesController_1 = __importDefault(require("../controllers/l_and_d/getAllBatchesController"));
const getIncompleteTraineeList_1 = __importDefault(require("../controllers/l_and_d/getIncompleteTraineeList"));
const sendMailController_1 = __importDefault(require("../controllers/l_and_d/sendMailController"));
const verifyLoginJWT_1 = __importDefault(require("../middlewares/verifyLoginJWT"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const batchPercipioController_1 = __importDefault(require("../controllers/l_and_d/batchPercipioController"));
const getPercipioAssessmentScoresController_1 = __importDefault(require("../controllers/l_and_d/getPercipioAssessmentScoresController"));
const batchWatchTimeReportController_1 = __importDefault(require("../controllers/l_and_d/batchWatchTimeReportController"));
const getBehindTrainees_1 = __importDefault(require("../controllers/l_and_d/getBehindTrainees"));
const avgOfPercipioAssesment_1 = __importDefault(require("../controllers/l_and_d/avgOfPercipioAssesment"));
const batchDayWiseIncompleteTraineeListController_1 = __importDefault(require("../controllers/l_and_d/batchDayWiseIncompleteTraineeListController"));
const sendAssessmentMailController_1 = __importDefault(require("../controllers/l_and_d/sendAssessmentMailController"));
const updateCurrentDayController_1 = __importDefault(require("../controllers/l_and_d/updateCurrentDayController"));
const getDayWiseCompleteTraineeList_1 = __importDefault(require("../controllers/l_and_d/getDayWiseCompleteTraineeList"));
const getBatchWiseCompleteTraineesList_1 = __importDefault(require("../controllers/l_and_d/getBatchWiseCompleteTraineesList"));
const deactivateCoursesController_1 = __importDefault(require("../controllers/l_and_d/deactivateCoursesController"));
const generateBatchReportController_1 = __importDefault(require("../controllers/l_and_d/generateBatchReportController"));
const batchDayWiseCompleteTraineeListController_1 = __importDefault(require("../controllers/l_and_d/batchDayWiseCompleteTraineeListController"));
const generateBatchDayWiseReport_1 = __importDefault(require("../controllers/l_and_d/generateBatchDayWiseReport"));
const batchIncompleteTraineeListController_1 = __importDefault(require("../controllers/l_and_d/batchIncompleteTraineeListController"));
const batchCompleteTraineeListController_1 = __importDefault(require("../controllers/l_and_d/batchCompleteTraineeListController"));
//Multer DiskStorage Config
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        let dir = `D:\ILPex\TemporaryFileStorage`;
        fs_1.default.access(dir, function (error) {
            if (error) {
                console.log("Directory does not Exist");
                return fs_1.default.mkdir(dir, (error) => cb(error, dir));
            }
            else {
                console.log("Directory Exists");
                return cb(null, dir);
            }
        });
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const uploadFiles = (0, multer_1.default)({ storage: storage });
const router = (0, express_1.Router)();
router.get("/batch/currentDayUpdate", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, updateCurrentDayController_1.default)(req, res);
}));
router.get("/trainee", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getTraineesController_1.default)(req, res);
}));
router.post("/assessment", verifyLoginJWT_1.default, uploadFiles.single("file"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        const error = new Error("Please upload a file");
        return next(error);
    }
    // Pass the file to createBatchController
    req.file = file;
    (0, createAssessmentsController_1.default)(req, res);
}));
router.patch("/assessment", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, updateAssessmentsController_1.default)(req, res);
}));
router.get("/batch/:batch_id/progress", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, batchDayWiseProgressController_1.default)(req, res);
}));
router.get("/batch/:batch_id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getBatchDetailsController_1.default)(req, res);
}));
router.get("/batch", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getAllBatchesController_1.default)(req, res);
}));
router.get("/assessment/:assessment_id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getAssessmentDetailsController_1.default)(req, res);
}));
router.get("/assessment", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getAllAssessmentsController_1.default)(req, res);
}));
router.get("/batchAvg/:id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, batchAverageScore_1.default)(req, res);
}));
router.get("/percipioAssesmentAvg/:id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, avgOfPercipioAssesment_1.default)(req, res);
}));
router.post("/pending/day/mail", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendMailController_1.default)(req, res);
}));
router.get("/analysis/:batch_id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, batchCourseAnalysisController_1.default)(req, res);
}));
router.get("/trainee/:trainee_id/scores", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, traineeScoreController_1.default)(req, res);
}));
router.get("/analysis/:batch_id/:day_id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, batchDayWiseCourseAnalysisController_1.default)(req, res);
}));
router.get("/batch/:batch_id/pending/day/:id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getIncompleteTraineeList_1.default)(req, res);
}));
router.post("/batch/percipio", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, batchPercipioController_1.default)(req, res);
}));
router.get("/trainee/:trainee_id/percipio/assessment", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getPercipioAssessmentScoresController_1.default)(req, res);
}));
router.get("/batch/:batch_id/watchtime", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, batchWatchTimeReportController_1.default)(req, res);
}));
router.get("/batch/:batch_id/incompleteTrainees/:day_id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getBehindTrainees_1.default)(req, res);
}));
router.get("/batch/:batch_id/incompleteTraineesOfABatch/day/:day_id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, batchIncompleteTraineeListController_1.default)(req, res);
}));
router.get("/batch/:batch_id/incompleteTrainees/day/:day_id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, batchDayWiseIncompleteTraineeListController_1.default)(req, res);
}));
router.get("/batch/:batch_id/completeTrainees/day/:day_id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, batchDayWiseCompleteTraineeListController_1.default)(req, res);
}));
router.get("/batch/:batch_id/completeTraineesOfABatch/day/:day_id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, batchCompleteTraineeListController_1.default)(req, res);
}));
router.post("/assessment/mail", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendAssessmentMailController_1.default)(req, res);
}));
router.get("/batch/:batch_id/completeTrainees/:id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getDayWiseCompleteTraineeList_1.default)(req, res);
}));
router.get("/batch/:batch_id/completeTrainees/currentDay/:day_id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getBatchWiseCompleteTraineesList_1.default)(req, res);
}));
router.get("/batch/:batch_id/completeTrainees/currentDay/:day_id", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getBatchWiseCompleteTraineesList_1.default)(req, res);
}));
router.post("/course/deactivate", verifyLoginJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, deactivateCoursesController_1.default)(req, res);
}));
router.get("/batch/:batch_id/report", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, generateBatchReportController_1.default)(req, res);
}));
router.get("/batch/:batch_id/report/:day_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, generateBatchDayWiseReport_1.default)(req, res);
}));
exports.default = router;
