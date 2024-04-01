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
const findTraineeNamesOfABatchByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/findTraineeNamesOfABatchByBatchIdServices"));
const sendAssessmentMail_1 = __importDefault(require("../../services/l_and_d_Services/sendAssessmentMail"));
const sendAssessmentMailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { batch_id, assessment_name, start_date, end_date } = req.body;
    console.log("Received Data : ", batch_id, assessment_name, start_date, end_date);
    if (!batch_id || !assessment_name || !start_date || !end_date)
        return res.status(404).json({ error: 'Missing Fields in the request' });
    const traineesList = yield (0, findTraineeNamesOfABatchByBatchIdServices_1.default)(batch_id);
    console.log("INSIDE ASSESSMENT MAILLL----------------");
    traineesList.map((traineeObject) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, sendAssessmentMail_1.default)(traineeObject.email, traineeObject.user_name, assessment_name, start_date, end_date);
    }));
    console.log("COMPLETED MAILLL------------");
    return res.status(200).json({ message: "Successfully sent mail" });
});
exports.default = sendAssessmentMailController;
