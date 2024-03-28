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
const calculateTraineeProgress_1 = __importDefault(require("../TraineeServices/calculateTraineeProgress"));
const individualTraineeProgress_1 = __importDefault(require("../TraineeServices/individualTraineeProgress"));
const findCurrentDayForEachTrainee = (trainee_id) => __awaiter(void 0, void 0, void 0, function* () {
    const traineeProgress = yield (0, individualTraineeProgress_1.default)(trainee_id);
    console.log("Individual trainee progress", traineeProgress);
    if (traineeProgress == null) {
        return (0);
    }
    //  else if(traineeProgress.length === 0){
    //     return ("Trainee doesn't have any progress reported");
    // }
    const dayCard = yield (0, calculateTraineeProgress_1.default)(trainee_id);
    console.log("Day Card ", dayCard);
    // Filter dayCard to include only items with status true
    const filteredDayCard = dayCard.filter(item => item.status === true);
    // Find the greatest day_number among filtered items
    const maxDayNumber = Math.max(...filteredDayCard.map(item => item.day_number));
    // console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n  maxDayNumber",maxDayNumber,trainee_id)
    return maxDayNumber;
});
exports.default = findCurrentDayForEachTrainee;
