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
const percipio_assessment_1 = __importDefault(require("../../models/percipio_assessment"));
const batchAverage = (listTraine) => __awaiter(void 0, void 0, void 0, function* () {
    let array = [];
    let highScore = 0;
    let sum = 0;
    let avg = 0;
    let allSum = 0;
    let excellent = 0;
    let good = 0;
    let poor = 0;
    yield Promise.all(listTraine.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const count = yield percipio_assessment_1.default.findAll({
            where: { trainee_id: item }
        });
        let leng = count.length;
        if (leng !== 0) {
            console.log('entered to function');
            let leng = count.length;
            sum = 0;
            yield Promise.all(count.map((term) => __awaiter(void 0, void 0, void 0, function* () {
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
