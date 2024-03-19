"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const percipio_assessment_1 = tslib_1.__importDefault(require("../../models/percipio_assessment"));
const batchAverage = (listTraine) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let array = [];
    let highScore = 0;
    let sum = 0;
    let avg = 0;
    let allSum = 0;
    let excellent = 0;
    let good = 0;
    let poor = 0;
    yield Promise.all(listTraine.map((item) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const count = yield percipio_assessment_1.default.findAll({
            where: { trainee_id: item }
        });
        let leng = count.length;
        if (leng !== 0) {
            console.log('entered to function');
            let leng = count.length;
            sum = 0;
            yield Promise.all(count.map((term) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                var _a;
                highScore = (_a = term === null || term === void 0 ? void 0 : term.high_score) !== null && _a !== void 0 ? _a : 0;
                sum += highScore;
            })));
            avg = sum / leng;
            if (avg >= 95) {
                excellent += 1;
            }
            else if (avg >= 25) {
                good += 1;
            }
            else {
                poor += 1;
            }
            allSum += avg;
            console.log(allSum);
        }
    })));
    return { allSum, excellent, good, poor };
});
exports.default = batchAverage;
