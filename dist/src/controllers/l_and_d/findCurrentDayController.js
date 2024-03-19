"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const findBatchByBatchIdServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_services/traineeAnalysis/findBatchByBatchIdServices"));
const getWorkingDaysServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_services/getWorkingDaysServices"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const findCurrentDayController = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const batch_id = parseInt(req.params.batch_id);
        const current_date = req.params.current_date;
        if (!batch_id || !current_date)
            return res.status(404).json({ message: 'Missing Fields! Make sure Batch ID and Current Date is Present' });
        const findBatch = yield (0, findBatchByBatchIdServices_1.default)(batch_id);
        if (findBatch) {
            const start_date = findBatch.start_date;
            const end_date = findBatch.end_date;
            const dayDateMappingList = (0, getWorkingDaysServices_1.default)(start_date, end_date);
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
