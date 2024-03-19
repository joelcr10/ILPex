"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sumOfScore = (count) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let sum = 0;
    yield Promise.all(count.map((term) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const highScore = (_a = term === null || term === void 0 ? void 0 : term.high_score) !== null && _a !== void 0 ? _a : 0;
        sum += highScore;
    })));
    return sum;
});
exports.default = sumOfScore;
