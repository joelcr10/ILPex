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
const course_batch_allocation_1 = __importDefault(require("../../models/course_batch_allocation"));
const findBatchesAssignedToACourseByCourseSetIdServices = (course_set_id) => __awaiter(void 0, void 0, void 0, function* () {
    const findBatches = yield course_batch_allocation_1.default.findAll({ where: {
            course_set_id: course_set_id
        } });
    return findBatches;
});
exports.default = findBatchesAssignedToACourseByCourseSetIdServices;
