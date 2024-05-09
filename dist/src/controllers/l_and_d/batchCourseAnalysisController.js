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
const findBatchByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/trainee_analysis/findBatchByBatchIdServices"));
const getWorkingDaysServices_1 = __importDefault(require("../../services/l_and_d_Services/getWorkingDaysServices"));
const moment_1 = __importDefault(require("moment"));
const findTraineesOfABatchServices_1 = __importDefault(require("../../services/l_and_d_Services/trainee_analysis/findTraineesOfABatchServices"));
const getCourseSetIdByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/getCourseSetIdByBatchIdServices"));
const findCoursesInADayByCurrentDayServices_1 = __importDefault(require("../../services/l_and_d_Services/findCoursesInADayByCurrentDayServices"));
const findLargestDayNumberInTheCourseSetServices_1 = __importDefault(require("../../services/l_and_d_Services/findLargestDayNumberInTheCourseSetServices"));
const batchCourseAnalysisController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let onTrack = 0;
    let laggingBehind = 0;
    try {
        const batch_id = parseInt(req.params.batch_id);
        if (!batch_id)
            return res
                .status(401)
                .json({ error: "Please ensure that the Batch ID is Provided" });
        else {
            const findBatchById = yield (0, findBatchByBatchIdServices_1.default)(batch_id);
            if (findBatchById) {
                const courseSetId = yield (0, getCourseSetIdByBatchIdServices_1.default)(Number(batch_id));
                //Store Batch's start date, end date and Current date
                const batchStartDate = findBatchById.start_date;
                const batchEndDate = findBatchById.end_date;
                const currentDate = new Date();
                //Converting time format
                const currentStandardDate = (0, moment_1.default)(currentDate)
                    .utcOffset("+05:30")
                    .format("YYYY-MM-DD");
                //Find the list of working days and store them in 'dayDateMappingList' array (Excluding Sundays)
                const dayDateMappingList = (0, getWorkingDaysServices_1.default)(batchStartDate, batchEndDate);
                const dayDateMappingListString = [];
                //Converting each date to string trimming the time part
                dayDateMappingList.forEach((date, index) => {
                    const convertedDate = (0, moment_1.default)(date)
                        .utcOffset("+05:30")
                        .format("YYYY-MM-DD");
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
                    const dateString = isoString.substring(0, isoString.indexOf("T"));
                    currentDay = dayDateMappingListString.indexOf(dateString) + 1;
                }
                else {
                    currentDay =
                        dayDateMappingListString.indexOf(currentStandardDate) + 1;
                }
                //Storing the current day
                // const currentDay = dayDateMappingListString.indexOf(currentStandardDate);
                //Find the list of all Trainees belonging to the batch with the corresponding Batch ID
                //Modify current day if batch end date is over
                if (currentDate > batchEndDate)
                    currentDay = dayDateMappingListString.length;
                console.log("Received Day : ", currentDay);
                const courseSetIdFind = yield (0, getCourseSetIdByBatchIdServices_1.default)(Number(batch_id));
                const courseSetHighestDay = yield (0, findLargestDayNumberInTheCourseSetServices_1.default)(courseSetIdFind);
                if (courseSetHighestDay < currentDay)
                    currentDay = courseSetHighestDay;
                console.log("Final Day ID ---> ", currentDay);
                const traineesList = yield (0, findTraineesOfABatchServices_1.default)(batch_id);
                if (traineesList) {
                    if (Array.isArray(traineesList)) {
                        //Finding the number of courses in the particular day
                        // const numberOfCourses = await findNumberOfCoursesByDayNumber(currentDay);
                        let numberOfCoursesArray = yield (0, findCoursesInADayByCurrentDayServices_1.default)(currentDay, courseSetId);
                        if (numberOfCoursesArray.length === 0) {
                            numberOfCoursesArray =
                                yield (0, findCoursesInADayByCurrentDayServices_1.default)(currentDay - 1, courseSetId);
                            currentDay = currentDay - 1;
                        }
                        console.log("Current day Inside Batch---> ", currentDay);
                        console.log("Courses -------> ", numberOfCoursesArray);
                        const numberOfCourses = numberOfCoursesArray.length;
                        for (const trainee of traineesList) {
                            if (trainee.trainee_id !== undefined) {
                                //Check if the particular Trainee has completed all the courses till the previous day of when he/she is trying to generate the report
                                console.log("Trainee ID ------> ", trainee.trainee_id);
                                console.log("Trainee's Current Day -----> ", trainee.current_day);
                                if (trainee.current_day >= currentDay) {
                                    onTrack++;
                                }
                                else
                                    laggingBehind++;
                            }
                            else {
                                return res
                                    .status(404)
                                    .json({ error: "Trainee does not exist" });
                            }
                            console.log("On Track ------> ", onTrack);
                            console.log("Lagging ---------> ", laggingBehind);
                        }
                        return res
                            .status(200)
                            .json({ onTrack: onTrack, laggingBehind: laggingBehind });
                    }
                    else {
                        return res.status(404).json({ error: "Trainee does not exist" });
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
