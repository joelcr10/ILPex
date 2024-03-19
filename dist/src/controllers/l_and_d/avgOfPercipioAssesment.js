"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const findTrainee_1 = tslib_1.__importDefault(require("../../services/l_and_d_Services/findTrainee"));
const traineList_1 = tslib_1.__importDefault(require("../../services/l_and_d_Services/traineList"));
const percipioAverage_1 = tslib_1.__importDefault(require("../../services/l_and_d_Services/percipioAverage"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const percipioAssesmentAverage = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(404).json({ message: "Batch id not defined" });
        }
        const batch = yield (0, findTrainee_1.default)(id); //Service to Find Trainees.
        // console.log(batch)
        let allAvg = 0;
        const listTraine = yield (0, traineList_1.default)(batch); //Service to make array of trainee list.
        // console.log(listTraine)
        const len = listTraine.length;
        const { allSum, excellent, good, poor } = yield (0, percipioAverage_1.default)(listTraine); //Service to calculate the batch avg.
        allAvg = allSum / len;
        return res.json({ average: `${allAvg}`, excellent: `${excellent}`, good: `${good}`, poor: `${poor}` });
    }
    catch (error) {
        return res.json(error);
    }
});
exports.default = percipioAssesmentAverage;
