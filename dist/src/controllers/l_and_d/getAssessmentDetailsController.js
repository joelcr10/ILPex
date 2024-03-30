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
const getAssessmentBatchesServices_1 = __importDefault(require("../../services/l_and_d_Services/getAssessmentBatchesServices"));
const getAssessmentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assesment_id = parseInt(req.params.assessment_id);
        if (assesment_id == null) {
            return res.status(400).json({ message: "Assessment Id not defined" });
        }
        const questions = yield (0, getQuestionsService_1.default)(assesment_id);
        if (questions == null) {
            return res.status(404).json({ message: "No Questions Found" });
        }
        const assessmentBatch = yield (0, getAssessmentBatchesServices_1.default)(assesment_id);
        if (assessmentBatch == null) {
            return res.status(404).json({ message: "No Assessment Found" });
        }
        return res.status(200).json({ questions, assessmentBatch });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
exports.default = getAssessmentDetails;
