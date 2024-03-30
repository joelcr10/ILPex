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
const getTraineeCurrentDayByTraineeIdServices_1 = __importDefault(require("../../services/TraineeServices/getTraineeCurrentDayByTraineeIdServices"));
const findTraineeCurrentDayController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainee_id = req.params.trainee_id;
        if (!trainee_id)
            return res.status(404).json({ message: "Trainee id is not defined" });
        const currentDay = yield (0, getTraineeCurrentDayByTraineeIdServices_1.default)(Number(trainee_id));
        return res.status(200).json({ current_day: currentDay });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = findTraineeCurrentDayController;
