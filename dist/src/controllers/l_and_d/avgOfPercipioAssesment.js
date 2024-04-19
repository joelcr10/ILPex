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
const percipioAverage_1 = __importDefault(require("../../services/l_and_d_Services/percipioAverage"));
const findTraineesOfABatchServices_1 = __importDefault(require("../../services/l_and_d_Services/trainee_analysis/findTraineesOfABatchServices"));
// const app =express();
// app.use(express.json());
const percipioAssesmentAverage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(404).json({ message: "Batch id not defined" });
        }
        let allAvg = 0;
        const traineesList = yield (0, findTraineesOfABatchServices_1.default)(id);
        if (traineesList == null) {
            return res.status(404).json({ message: "No Trainees found on the Batch" });
        }
        const len = traineesList.length;
        const { allSum, excellent, good, poor, excellentTraineesList, goodTraineesList, poorTraineesList } = yield (0, percipioAverage_1.default)(traineesList); //Service to calculate the batch avg.
        allAvg = allSum / len;
        return res.json({ average: `${allAvg}`,
            excellent: `${excellent}`,
            good: `${good}`, poor: `${poor}`,
            excellentTraineesList,
            goodTraineesList,
            poorTraineesList });
    }
    catch (error) {
        return res.json(error);
    }
});
exports.default = percipioAssesmentAverage;
