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
const batches_1 = __importDefault(require("../../models/batches"));
const trainees_1 = __importDefault(require("../../models/trainees"));
const users_1 = __importDefault(require("../../models/users"));
const getAllTraineesServices = (offset, sortKey, sortOrder, batchId // Optional batchId parameter
) => __awaiter(void 0, void 0, void 0, function* () {
    const queryOptions = {
        include: [
            {
                // Join Batches model
                model: batches_1.default,
                required: true,
                attributes: ['batch_name']
            },
            {
                // Join User model
                model: users_1.default,
                required: true,
                attributes: ['user_name']
            },
        ],
        order: [[sortKey, sortOrder]],
        offset: offset,
        attributes: ['trainee_id', 'user_id', 'batch_id'],
    };
    // Apply batch_id filter if provided
    if (batchId !== 0) {
        queryOptions.where = { batch_id: batchId, isActive: true };
    }
    const trainees = yield trainees_1.default.findAll(queryOptions);
    return trainees;
});
exports.default = getAllTraineesServices;
