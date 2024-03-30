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
const getTraineeScoresServices_1 = __importDefault(require("../../services/l_and_d_Services/getTraineeScoresServices"));
const traineeScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainee_id = parseInt(req.params.trainee_id);
        if (!trainee_id) {
            return res.status(400).json({ message: 'trainee_id not defined' });
        }
        const scoreDetails = yield (0, getTraineeScoresServices_1.default)(trainee_id);
        if (scoreDetails == null) {
            return res.status(404).json({ message: 'No scores found for the specified trainee' });
        }
        return res.status(200).json({ scoreDetails });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
exports.default = traineeScore;
