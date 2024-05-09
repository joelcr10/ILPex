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
const findTraineeNamesOfABatchByBatchIdServices = (batch_id) => __awaiter(void 0, void 0, void 0, function* () {
    const findTrainees = yield trainees_1.default.findAll({ where: { batch_id: batch_id, isActive: true } });
    const userIds = findTrainees.map(trainee => trainee.user_id);
    const userDetails = yield users_1.default.findAll({
        attributes: ['user_id', 'email', 'user_name'],
        where: { user_id: userIds }
    });
    const userDetailsDataValues = userDetails.map(user => user.dataValues);
    console.log("User Details ----------> ", userDetailsDataValues);
    return userDetailsDataValues;
});
exports.default = findTraineeNamesOfABatchByBatchIdServices;
