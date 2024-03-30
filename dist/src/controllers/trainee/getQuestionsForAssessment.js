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
const getQuestionsService_1 = __importDefault(require("../../services/TraineeServices/assessmentServices/getQuestionsService"));
const getQuestionsForAssessment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assessmentId = req.params.id;
        if (!assessmentId) {
            return res.status(404).json({ message: "Assessment id not defined" });
        }
        const assessment_id = parseInt(assessmentId);
        // Find questions for the specified assessment_id
        const questionsList = yield (0, getQuestionsService_1.default)(assessment_id);
        if (questionsList) {
            return res.status(200).json({ questions: questionsList });
        }
        else {
            return res.status(404).json({
                questions: "Questions for this assessment cannot be found. Please try again.",
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = getQuestionsForAssessment;
