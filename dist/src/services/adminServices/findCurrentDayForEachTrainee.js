"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const calculateTraineeProgress_1 = tslib_1.__importDefault(require("../TraineeServices/calculateTraineeProgress"));
const individualTraineeProgress_1 = tslib_1.__importDefault(require("../TraineeServices/individualTraineeProgress"));
const findCurrentDayForEachTrainee = (trainee_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
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
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n  maxDayNumber", maxDayNumber, trainee_id);
    return maxDayNumber;
});
exports.default = findCurrentDayForEachTrainee;
