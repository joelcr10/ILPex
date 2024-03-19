"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const updateExistingResultService = (score, existingResult) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield existingResult.update({
        high_score: score,
    });
});
exports.default = updateExistingResultService;
