"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const questions_1 = tslib_1.__importDefault(require("../../../models/questions"));
const getQuestionsService = (assessment_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const questions = yield questions_1.default.findAll({
        where: {
            assessment_id: assessment_id,
        },
        attributes: [
            "question_id",
            "question",
            "option_a",
            "option_b",
            "option_c",
            "option_d",
            "correct_answer",
        ],
    });
    return questions;
});
exports.default = getQuestionsService;
