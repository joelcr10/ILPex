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
const traineesByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/traineesByBatchIdServices"));
const findTraineeNameByTraineeIdServices_1 = __importDefault(require("../../services/l_and_d_Services/findTraineeNameByTraineeIdServices"));
const batchDetailsServices_1 = __importDefault(require("../../services/l_and_d_Services/batchDetailsServices"));
const findUserIdByTraineeIdServices_1 = __importDefault(require("../../services/l_and_d_Services/findUserIdByTraineeIdServices"));
const getCourseSetIdByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/getCourseSetIdByBatchIdServices"));
const findCurrentDayOfTheTraineeServices_1 = __importDefault(require("../../services/adminServices/findCurrentDayOfTheTraineeServices"));
const findLargestDayNumberInTheCourseSetServices_1 = __importDefault(require("../../services/l_and_d_Services/findLargestDayNumberInTheCourseSetServices"));
const batchCompleteTraineeListController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let completeTraineesList = [];
    try {
        let batch_id = parseInt(req.params.batch_id);
        let day_id = parseInt(req.params.day_id);
        console.log("Received Day : ", day_id);
        const courseSetIdFind = yield (0, getCourseSetIdByBatchIdServices_1.default)(Number(batch_id));
        const courseSetHighestDay = yield (0, findLargestDayNumberInTheCourseSetServices_1.default)(courseSetIdFind);
        if (courseSetHighestDay < day_id)
            day_id = courseSetHighestDay;
        console.log("Final Day ID ---> ", day_id);
        const findTrainees = yield (0, traineesByBatchIdServices_1.default)(batch_id);
        const batchName = yield (0, batchDetailsServices_1.default)(batch_id);
        if (findTrainees && batchName) {
            for (const trainee of findTrainees) {
                if (trainee.trainee_id) {
                    const userId = yield (0, findUserIdByTraineeIdServices_1.default)(trainee.trainee_id);
                    const current_day_of_the_trainee = yield (0, findCurrentDayOfTheTraineeServices_1.default)(trainee.trainee_id);
                    if (current_day_of_the_trainee < day_id) {
                        continue;
                    }
                    else {
                        const traineeDetails = yield (0, findTraineeNameByTraineeIdServices_1.default)(trainee.trainee_id);
                        const traineeName = traineeDetails.user_name;
                        const traineeEmail = traineeDetails.email;
                        const traineeObject = {
                            user_id: userId,
                            trainee_id: trainee.trainee_id,
                            batch_id: batch_id,
                            user_name: traineeName,
                            email: traineeEmail,
                            batch_name: batchName.batch_name,
                        };
                        completeTraineesList.push(traineeObject);
                    }
                }
                else {
                    return res.status(404).json({ error: "Invalid Trainee ID" });
                }
            }
            return res
                .status(200)
                .json({ CompleteTraineeList: completeTraineesList });
        }
        else {
            return res.status(404).json({ error: "No trainees exist in this batch" });
        }
    }
    catch (error) {
        return res.status(520).json({ error: "Unknown Error Occured : " + error });
    }
});
exports.default = batchCompleteTraineeListController;
