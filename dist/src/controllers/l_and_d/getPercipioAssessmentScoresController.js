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
const courseByCourseIdService_1 = __importDefault(require("../../services/TraineeServices/courseByCourseIdService"));
const percipioAssessmentScoreService_1 = __importDefault(require("../../services/TraineeServices/percipioAssessmentScoreService"));
const getPercipioAssessmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainee_id = parseInt(req.params.trainee_id);
        if (!trainee_id) {
            return res.status(400).json({ message: "Please ensure that the trainee_id is provided" });
        }
        const assessments = yield (0, percipioAssessmentScoreService_1.default)(trainee_id);
        if (assessments && assessments.length > 0) {
            const combinedData = yield Promise.all(assessments.map((assessment) => __awaiter(void 0, void 0, void 0, function* () {
                const course_id = assessment.course_id;
                const course = yield (0, courseByCourseIdService_1.default)(course_id);
                // Extracting required fields from assessments and course
                if (course)
                    return {
                        course_id: course.course_id,
                        course_name: course.course_name,
                        day_number: course.day_number,
                        high_score: assessment.high_score,
                        trainee_id: assessment.trainee_id
                    };
            })));
            return res.status(200).json({ data: combinedData });
        }
        else {
            return res.status(404).json({ error: "No assessments found for the trainee" });
        }
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
});
exports.default = getPercipioAssessmentController;
