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
const assessment_batch_allocation_1 = __importDefault(require("../../../models/assessment_batch_allocation"));
const uploadAssessmentToBatch = (assessment, batch_id, user_id, start_date, end_date, number_of_attempts) => __awaiter(void 0, void 0, void 0, function* () {
    const assessmentToBatch = yield assessment_batch_allocation_1.default.create({ assessment_id: assessment.assessment_id, batch_id: batch_id, createdBy: user_id, assessment_status: true, start_date: start_date, end_date: end_date, number_of_attempts: number_of_attempts });
});
exports.default = uploadAssessmentToBatch;
