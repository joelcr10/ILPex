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
const getAssessmentBatchAllocation = (batch_id) => __awaiter(void 0, void 0, void 0, function* () {
    //Fetching all the assessments assigned to a particular batch.
    const assessmentsList = yield assessment_batch_allocation_1.default.findAll({
        where: {
            batch_id: batch_id,
        },
        attributes: ["assessment_batch_allocation_id", "assessment_id", "end_date"],
    });
    return assessmentsList;
});
exports.default = getAssessmentBatchAllocation;
