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
const trainees_1 = __importDefault(require("../../../models/trainees"));
const users_1 = __importDefault(require("../../../models/users"));
const findBatchByBatchNameServices_1 = __importDefault(require("./findBatchByBatchNameServices"));
const patchUserServices = (duplicateTraineeStatus, Name, Email, batch_name) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUserTable = yield users_1.default.update({ user_name: Name }, { where: { email: Email } });
    const findBatch = yield (0, findBatchByBatchNameServices_1.default)(batch_name);
    const batchId = findBatch === null || findBatch === void 0 ? void 0 : findBatch.batch_id;
    const updateTraineeTable = yield trainees_1.default.update({ batch_id: batchId }, { where: { user_id: duplicateTraineeStatus.user_id } });
    return updateTraineeTable;
});
exports.default = patchUserServices;
