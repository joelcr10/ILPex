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
const results_1 = __importDefault(require("../../../models/results"));
const getExistingResultService = (assessment_batches_allocation_id, trainee_id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingResult = yield results_1.default.findOne({
        where: {
            assessment_batches_allocation_id: assessment_batches_allocation_id,
            trainee_id: trainee_id,
        },
    });
    return existingResult;
});
exports.default = getExistingResultService;
