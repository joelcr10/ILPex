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
const findTraineeNameByTraineeIdServices = (trainee_id) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield trainees_1.default.findOne({ where: { trainee_id: trainee_id } });
    if (findUser) {
        const user = yield users_1.default.findOne({ where: { user_id: findUser.user_id } });
        if (user)
            return user;
    }
});
exports.default = findTraineeNameByTraineeIdServices;
