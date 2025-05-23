import { Router, Request, Response } from "express";
import getTrainess from "../controllers/l_and_d/getTraineesController";
import createAssessmentController from "../controllers/l_and_d/createAssessmentsController";
import updateAssessmentController from "../controllers/l_and_d/updateAssessmentsController";
import getBatchDetails from "../controllers/l_and_d/getBatchDetailsController";
import getAllAsssessment from "../controllers/l_and_d/getAllAssessmentsController";
import batchCourseAnalysisController from "../controllers/l_and_d/batchCourseAnalysisController";
import batchAverage from "../controllers/l_and_d/batchAverageScore";
import sendMail from "../services/l_and_d_Services/sendMail";
import getAssessmentDetails from "../controllers/l_and_d/getAssessmentDetailsController";
import traineeScore from "../controllers/l_and_d/traineeScoreController";
import batchDayWiseProgressController from "../controllers/l_and_d/batchDayWiseProgressController";
import batchDayWiseCourseAnalysisController from "../controllers/l_and_d/batchDayWiseCourseAnalysisController";
import getAllBatches from "../controllers/l_and_d/getAllBatchesController";
import getIncompleteTraineeList from "../controllers/l_and_d/getIncompleteTraineeList";
import sendMailController from "../controllers/l_and_d/sendMailController";
import verifyLoginJWT from "../middlewares/verifyLoginJWT";
import multer from "multer";
import fs from "fs";
import batchPercipioController from "../controllers/l_and_d/batchPercipioController";
import getPercipioAssessmentController from "../controllers/l_and_d/getPercipioAssessmentScoresController";
import batchWatchTimeReportController from "../controllers/l_and_d/batchWatchTimeReportController";
import getIncompleteTraineeListForDay from "../controllers/l_and_d/getBehindTrainees";
import percipioAssesmentAverage from "../controllers/l_and_d/avgOfPercipioAssesment";
import batchDayWiseIncompleteTraineeListController from "../controllers/l_and_d/batchDayWiseIncompleteTraineeListController";
import sendAssessmentMailController from "../controllers/l_and_d/sendAssessmentMailController";
import updateCurrentDayController from "../controllers/l_and_d/updateCurrentDayController";
import getCompleteTraineeList from "../controllers/l_and_d/getDayWiseCompleteTraineeList";
import getBatchwiseCompleteTraineesList from "../controllers/l_and_d/getBatchWiseCompleteTraineesList";
import deactivateCourseController from "../controllers/l_and_d/deactivateCoursesController";
import generateBatchReportController from "../controllers/l_and_d/generateBatchReportController";
import batchDayWiseCompleteTraineeListController from "../controllers/l_and_d/batchDayWiseCompleteTraineeListController";
import generateBatchReportDayWiseController from "../controllers/l_and_d/generateBatchDayWiseReport";
import batchIncompleteTraineeListController from "../controllers/l_and_d/batchIncompleteTraineeListController";
import batchCompleteTraineeListController from "../controllers/l_and_d/batchCompleteTraineeListController";
import traineeAllDayController from "../controllers/l_and_d/traineeAllDays";

//Multer DiskStorage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = `D:\ILPex\TemporaryFileStorage`;

    fs.access(dir, function (error) {
      if (error) {
        console.log("Directory does not Exist");
        return fs.mkdir(dir, (error) => cb(error, dir));
      } else {
        console.log("Directory Exists");
        return cb(null, dir);
      }
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadFiles = multer({ storage: storage });

const router = Router();

router.get(
  "/batch/currentDayUpdate",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    updateCurrentDayController(req, res);
  }
);

router.get("/trainee", verifyLoginJWT, async (req: Request, res: Response) => {
  getTrainess(req, res);
});

router.post(
  "/assessment",
  verifyLoginJWT,
  uploadFiles.single("file"),
  async (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      return next(error);
    }

    // Pass the file to createBatchController
    req.file = file;
    createAssessmentController(req, res);
  }
);
router.patch(
  "/assessment",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    updateAssessmentController(req, res);
  }
);
router.get(
  "/batch/:batch_id/progress",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    batchDayWiseProgressController(req, res);
  }
);
router.get(
  "/batch/:batch_id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    getBatchDetails(req, res);
  }
);

router.get("/batch", verifyLoginJWT, async (req: Request, res: Response) => {
  getAllBatches(req, res);
});

router.get(
  "/assessment/:assessment_id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    getAssessmentDetails(req, res);
  }
);

router.get(
  "/assessment",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    getAllAsssessment(req, res);
  }
);
router.get(
  "/batchAvg/:id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    batchAverage(req, res);
  }
);
router.get(
  "/percipioAssesmentAvg/:id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    percipioAssesmentAverage(req, res);
  }
);
router.post(
  "/pending/day/mail",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    sendMailController(req, res);
  }
);

router.get(
  "/analysis/:batch_id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    batchCourseAnalysisController(req, res);
  }
);

router.get(
  "/trainee/:trainee_id/scores",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    traineeScore(req, res);
  }
);

router.get(
  "/analysis/:batch_id/:day_id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    batchDayWiseCourseAnalysisController(req, res);
  }
);

router.get(
  "/batch/:batch_id/pending/day/:id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    getIncompleteTraineeList(req, res);
  }
);

router.post("/batch/percipio", async (req: Request, res: Response) => {
  batchPercipioController(req, res);
});

router.get(
  "/trainee/:trainee_id/percipio/assessment",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    getPercipioAssessmentController(req, res);
  }
);

router.get(
  "/batch/:batch_id/watchtime",
  async (req: Request, res: Response) => {
    batchWatchTimeReportController(req, res);
  }
);

router.get(
  "/batch/:batch_id/incompleteTrainees/:day_id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    getIncompleteTraineeListForDay(req, res);
  }
);

router.get(
  "/batch/:batch_id/incompleteTraineesOfABatch/day/:day_id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    batchIncompleteTraineeListController(req, res);
  }
);

router.get(
  "/batch/:batch_id/incompleteTrainees/day/:day_id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    batchDayWiseIncompleteTraineeListController(req, res);
  }
);

router.get(
  "/batch/:batch_id/completeTrainees/day/:day_id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    batchDayWiseCompleteTraineeListController(req, res);
  }
);

router.get(
  "/batch/:batch_id/completeTraineesOfABatch/day/:day_id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    batchCompleteTraineeListController(req, res);
  }
);

router.post(
  "/assessment/mail",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    sendAssessmentMailController(req, res);
  }
);

router.get(
  "/batch/:batch_id/completeTrainees/:id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    getCompleteTraineeList(req, res);
  }
);

router.get(
  "/batch/:batch_id/completeTrainees/currentDay/:day_id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    getBatchwiseCompleteTraineesList(req, res);
  }
);

router.get(
  "/batch/:batch_id/completeTrainees/currentDay/:day_id",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    getBatchwiseCompleteTraineesList(req, res);
  }
);

router.post(
  "/course/deactivate",
  verifyLoginJWT,
  async (req: Request, res: Response) => {
    deactivateCourseController(req, res);
  }
);

router.get("/batch/:batch_id/report", async (req: Request, res: Response) => {
  generateBatchReportController(req, res);
});

router.get(
  "/batch/:batch_id/report/:day_id",
  async (req: Request, res: Response) => {
    generateBatchReportDayWiseController(req, res);
  }
);

router.get('/trainee/:trainee_id/status', async(req: Request, res: Response) =>{
  traineeAllDayController(req,res);
})

export default router;
