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
const checkTraineeProgress = (trainee_id, course_id, day_number) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TrackExist = yield trainee_progress_1.default.findOne({
            where: {
                trainee_id: trainee_id,
                course_id: course_id,
                day_number: day_number
            }
        });
        return TrackExist;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.default = checkTraineeProgress;
