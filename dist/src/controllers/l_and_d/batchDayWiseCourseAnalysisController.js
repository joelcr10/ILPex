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
const findbatchbybatchidservices_1 = __importDefault(require("../../services/l_and_d_services/trainee_analysis/findbatchbybatchidservices"));
const findTraineesOfABatchServices_1 = __importDefault(require("../../services/l_and_d_services/trainee_analysis/findTraineesOfABatchServices"));
const findNumberOfCoursesByDayNumber_1 = __importDefault(require("../../services/l_and_d_services/trainee_analysis/findNumberOfCoursesByDayNumber"));
const findTraineeStatusServices_1 = __importDefault(require("../../services/l_and_d_services/trainee_analysis/findTraineeStatusServices"));
const batchDayWiseCourseAnalysisController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let onTrack = 0;
    let laggingBehind = 0;
    try {
        const batch_id = parseInt(req.params.batch_id);
        const day_id = parseInt(req.params.day_id);
        if (!batch_id || !day_id)
            return res.status(401).json({ error: "Please ensure that the Batch ID and Day ID is Provided" });
        else {
            const findBatchById = yield (0, findbatchbybatchidservices_1.default)(batch_id);
            if (findBatchById) {
                //Storing the current day.
                const currentDay = day_id;
                //Find the list of all Trainees belonging to the batch with the corresponding Batch ID
                const traineesList = yield (0, findTraineesOfABatchServices_1.default)(batch_id);
                if (traineesList) {
                    if (Array.isArray(traineesList)) {
                        //Finding the number of courses in the particular day
                        const numberOfCourses = yield (0, findNumberOfCoursesByDayNumber_1.default)(currentDay);
                        for (const trainee of traineesList) {
                            if (trainee.trainee_id !== undefined) {
                                //Check if the particular Trainee has completed all the courses till the previous day of when he/she is trying to generate the report
                                const findTraineeCompletionStatus = yield (0, findTraineeStatusServices_1.default)(trainee.trainee_id, currentDay);
                                if (findTraineeCompletionStatus === numberOfCourses)
                                    onTrack++;
                                else
                                    laggingBehind++;
                            }
                            else {
                                return res.status(404).json({ error: 'Trainee does not exist' });
                            }
                        }
                        return res.status(200).json({ onTrack: onTrack, laggingBehind: laggingBehind });
                    }
                    else {
                        return res.status(404).json({ error: 'Trainee does not exist' });
                    }
                }
                else {
                    return res.status(404).json({ error: "Trainees Doesnt Exist" });
                }
            }
            else {
                return res.status(404).json({ error: "Such A Batch Doesn't Exist" });
            }
        }
    }
    catch (error) {
        return res.status(520).json({ error: "Unknown Error Occured : " + error });
    }
});
exports.default = batchDayWiseCourseAnalysisController;
