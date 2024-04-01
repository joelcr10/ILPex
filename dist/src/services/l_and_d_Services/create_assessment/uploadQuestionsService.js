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
const questions_1 = __importDefault(require("../../../models/questions"));
const uploadQuestionsService = (jsonQuestionsData, assessment, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    for (const row of jsonQuestionsData) {
        const { Question_Text, Option_A, Option_B, Option_C, Option_D, Correct_Answer } = row;
        console.log(row);
        const questions = yield questions_1.default.create({ assessment_id: assessment.assessment_id,
            question: Question_Text, option_a: Option_A, option_b: Option_B, option_c: Option_C, option_d: Option_D, correct_answer: Correct_Answer, createdBy: user_id }, { raw: true });
    }
    // return questions;
});
exports.default = uploadQuestionsService;
