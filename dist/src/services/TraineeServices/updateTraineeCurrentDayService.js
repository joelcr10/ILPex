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
const updateTraineeCurrentDayService = (trainee_id, day_number) => __awaiter(void 0, void 0, void 0, function* () {
    const findTrainee = yield trainees_1.default.findOne({ where: { trainee_id: trainee_id } });
    if (findTrainee == null) {
        return null;
    }
    const updateCurrentDay = yield findTrainee.update({
        current_day: day_number
    });
    return updateCurrentDay;
});
exports.default = updateTraineeCurrentDayService;
