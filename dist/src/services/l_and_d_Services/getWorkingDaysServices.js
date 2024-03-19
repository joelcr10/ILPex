"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getWorkingDaysServices = (startDate, endDate) => {
    let dateArray = [];
    const startDateFormatted = startDate.toLocaleDateString('en-CA');
    const endDateFormatted = endDate.toLocaleDateString('en-CA');
    let currentDate = new Date(startDateFormatted);
    currentDate.setDate(currentDate.getDate());
    let lastDate = new Date(endDateFormatted);
    lastDate.setDate(lastDate.getDate());
    //get array all days between startDate and endDate
    while (currentDate <= lastDate) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    //filter sundays and saturdays from array
    dateArray = dateArray.filter(date => date.getDay() !== 0 && date.getDay() !== 6);
    return dateArray;
};
exports.default = getWorkingDaysServices;
