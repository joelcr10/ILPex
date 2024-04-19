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
const getBatchService_1 = __importDefault(require("../../services/TraineeServices/assessmentServices/getBatchService"));
const getWorkingDaysServices_1 = __importDefault(require("../../services/l_and_d_Services/getWorkingDaysServices"));
const moment_1 = __importDefault(require("moment"));
const findCurrentDayController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batch_id = parseInt(req.params.batch_id);
        const current_date = req.params.current_date;
        if (!batch_id || !current_date)
            return res.status(404).json({ message: 'Missing Fields! Make sure Batch ID and Current Date is Present' });
        const findBatch = yield (0, getBatchService_1.default)(batch_id);
        if (findBatch) {
            const start_date = findBatch.start_date;
            const end_date = findBatch.end_date;
            const dayDateMappingList = (0, getWorkingDaysServices_1.default)(start_date, end_date);
            const compareCurrentDateValue = new Date("2024-03-31");
            if (compareCurrentDateValue >= end_date) {
                return res.status(200).json({ current_day: dayDateMappingList.length });
            }
            const dayDateMappingListString = [];
            //Converting each date to string trimming the time part
            dayDateMappingList.forEach((date, index) => {
                const convertedDate = (0, moment_1.default)(date).utcOffset('+05:30').format("YYYY-MM-DD");
                dayDateMappingListString[index] = convertedDate;
            });
            let currentDay;
            //Storing the current day
            if (dayDateMappingListString.indexOf(current_date) === -1) {
                const currentDateInDateFormat = new Date(current_date);
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
                currentDay = dayDateMappingListString.indexOf(current_date) + 1;
            }
            const currentDateForCompletionCheckDate = new Date(current_date);
            if (currentDateForCompletionCheckDate > end_date)
                currentDay = dayDateMappingListString.length;
            return res.status(200).json({ current_day: currentDay });
        }
        else
            return res.status(404).json({ error: 'Such a batch does not exist!' });
    }
    catch (error) {
        return res.status(520).json({ error: "Unknown Error Occured : " + error });
    }
});
exports.default = findCurrentDayController;
