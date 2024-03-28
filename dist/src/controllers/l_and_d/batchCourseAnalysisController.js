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
const getWorkingDaysServices_1 = __importDefault(require("../../services/l_and_d_services/getWorkingDaysServices"));
const moment_1 = __importDefault(require("moment"));
const findTraineesOfABatchServices_1 = __importDefault(require("../../services/l_and_d_services/trainee_analysis/findTraineesOfABatchServices"));
const findNumberOfCoursesByDayNumber_1 = __importDefault(require("../../services/l_and_d_services/trainee_analysis/findNumberOfCoursesByDayNumber"));
const findTraineeStatusServices_1 = __importDefault(require("../../services/l_and_d_services/trainee_analysis/findTraineeStatusServices"));
const batchCourseAnalysisController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let onTrack = 0;
    let laggingBehind = 0;
    try {
        const batch_id = parseInt(req.params.batch_id);
        if (!batch_id)
            return res.status(401).json({ error: "Please ensure that the Batch ID is Provided" });
        else {
            const findBatchById = yield (0, findbatchbybatchidservices_1.default)(batch_id);
            if (findBatchById) {
                //Store Batch's start date, end date and Current date
                const batchStartDate = findBatchById.start_date;
                const batchEndDate = findBatchById.end_date;
                const currentDate = new Date();
                //Converting time format
                const currentStandardDate = (0, moment_1.default)(currentDate).utcOffset('+05:30').format("YYYY-MM-DD");
                console.log("Standard Date : ", currentStandardDate);
                //Find the list of working days and store them in 'dayDateMappingList' array (Excluding Sundays)
                const dayDateMappingList = (0, getWorkingDaysServices_1.default)(batchStartDate, batchEndDate);
                const dayDateMappingListString = [];
                //Converting each date to string trimming the time part
                dayDateMappingList.forEach((date, index) => {
                    const convertedDate = (0, moment_1.default)(date).utcOffset('+05:30').format("YYYY-MM-DD");
                    dayDateMappingListString[index] = convertedDate;
                });
                let currentDay;
                //Handle Saturdays and Sundays
                if (dayDateMappingListString.indexOf(currentStandardDate) === -1) {
                    const currentDateInDateFormat = new Date(currentStandardDate);
                    const dayOfWeek = currentDateInDateFormat.getDay();
                    let daysToSubtract = 0;
                    if (dayOfWeek === 0) {
                        daysToSubtract = 2;
                    }
                    else if (dayOfWeek === 6) {
                        daysToSubtract = 1;
                    }
                    currentDateInDateFormat.setDate(currentDateInDateFormat.getDate() - daysToSubtract);
                    const isoString = currentDateInDateFormat.toISOString();
                    const dateString = isoString.substring(0, isoString.indexOf('T'));
                    currentDay = dayDateMappingListString.indexOf(dateString) + 1;
                }
                else {
                    currentDay = dayDateMappingListString.indexOf(currentStandardDate) + 1;
                }
                //Storing the current day
                // const currentDay = dayDateMappingListString.indexOf(currentStandardDate);
                console.log("Current Day :", currentDay);
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
exports.default = batchCourseAnalysisController;
