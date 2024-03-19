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
const individualTraineeProgress_1 = __importDefault(require("../../services/TraineeServices/individualTraineeProgress"));
const calculateTraineeProgress_1 = __importDefault(require("../../services/TraineeServices/calculateTraineeProgress"));
const dayCardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trainee_id = Number(req.params.trainee_id);
    const traineeProgress = yield (0, individualTraineeProgress_1.default)(trainee_id);
    if (traineeProgress == null) {
        return res.status(404).json({ message: "can't find trainee progress" });
    }
    else if (traineeProgress.length === 0) {
        return res.status(404).json({ message: "trainee doesn't have any progress reported" });
    }
    const dayCard = yield (0, calculateTraineeProgress_1.default)(trainee_id);
    return res.status(200).json({ data: dayCard });
});
exports.default = dayCardController;
