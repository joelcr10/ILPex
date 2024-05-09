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
const trainees_1 = __importDefault(require("../../models/trainees"));
const users_1 = __importDefault(require("../../models/users"));
const getTraineeNamesByBatchId = (batchId) => __awaiter(void 0, void 0, void 0, function* () {
    const trainee_id = yield trainees_1.default.findAll({
        where: {
            batch_id: batchId, isActive: true
        },
        attributes: ["user_id"],
    });
    const traineeIdsArray = trainee_id.map(trainee => trainee.user_id);
    const traineeUserNames = yield users_1.default.findAll({
        where: {
            user_id: traineeIdsArray
        },
        attributes: ["user_name"]
    });
    const userNamesArray = traineeUserNames.map(trainee => trainee.user_name);
    return userNamesArray;
});
exports.default = getTraineeNamesByBatchId;
