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
const findBatchIdByTraineeIdServices_1 = __importDefault(require("../../services/l_and_d_Services/findBatchIdByTraineeIdServices"));
const getCourseSetIdByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/getCourseSetIdByBatchIdServices"));
const calculateTraineeStatus_1 = __importDefault(require("../../services/TraineeServices/calculateTraineeStatus"));
const traineeAllDayController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trainee_id = Number(req.params.trainee_id);
    if (!trainee_id) {
        return res.status(400).json({ message: "request body missing trainee_id" });
    }
    const batchId = yield (0, findBatchIdByTraineeIdServices_1.default)(trainee_id);
    if (batchId === null) {
        return res.status(404).json({ message: "batch not found" });
    }
    const courseSetId = yield (0, getCourseSetIdByBatchIdServices_1.default)(batchId);
    if (courseSetId === null) {
        return res.status(404).json({ message: "course set not found" });
    }
    const dayCard = yield (0, calculateTraineeStatus_1.default)(trainee_id, courseSetId);
    return res.status(200).json({ data: dayCard });
});
exports.default = traineeAllDayController;
