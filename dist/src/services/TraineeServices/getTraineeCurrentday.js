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
const trainee_progress_1 = __importDefault(require("../../models/trainee_progress"));
const getTraineeCurrentDay = (trainee_id) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDay = yield trainee_progress_1.default.findAll({
        where: { trainee_id: trainee_id },
        attributes: ['day_number'],
        order: [['day_number', 'DESC']],
        limit: 1,
    });
    return currentDay;
});
exports.default = getTraineeCurrentDay;
