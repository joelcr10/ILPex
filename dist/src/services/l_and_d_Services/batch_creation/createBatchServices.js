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
const createBatchServices = (batch_name, start_date, end_date, userID, include_saturdays) => __awaiter(void 0, void 0, void 0, function* () {
    const creatingBatch = yield batches_1.default.create({
        batch_name: batch_name,
        start_date: start_date,
        end_date: end_date,
        include_saturdays: include_saturdays,
        current_day: 0,
        isActive: true,
        createdBy: userID,
        updatedBy: userID,
    });
    return creatingBatch;
});
exports.default = createBatchServices;
