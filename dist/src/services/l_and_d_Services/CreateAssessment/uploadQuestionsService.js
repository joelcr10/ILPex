"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const questions_1 = tslib_1.__importDefault(require("../../../models/questions"));
const uploadQuestionsService = (jsonBatchData, assessment, user_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    for (const row of jsonBatchData) {
        const { Question_Text, Option_A, Option_B, Option_C, Option_D, Correct_Answer } = row;
        console.log(row);
        const questions = yield questions_1.default.create({ assessment_id: assessment.assessment_id,
            question: Question_Text, option_a: Option_A, option_b: Option_B, option_c: Option_C, option_d: Option_D, correct_answer: Correct_Answer, createdBy: user_id }, { raw: true });
    }
    // return questions;
});
exports.default = uploadQuestionsService;
