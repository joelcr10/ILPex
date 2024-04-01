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
const batches_1 = __importDefault(require("../../../models/batches"));
const course_batch_allocation_1 = __importDefault(require("../../../models/course_batch_allocation"));
const deleteCreatedBatchByBatchId = (batch_id_global, course_batch_allocation_id_global) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteCourseBatchAllocation = yield course_batch_allocation_1.default.destroy({
        where: {
            course_set_id: course_batch_allocation_id_global,
            batch_id: batch_id_global
        }
    });
    const deleteBatch = yield batches_1.default.destroy({ where: { batch_id: batch_id_global } });
    return deleteBatch;
});
exports.default = deleteCreatedBatchByBatchId;
