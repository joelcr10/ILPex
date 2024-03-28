"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateDateServices = (startDateString, endDateString) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    if (endDate < startDate)
        return false;
    else
        return true;
};
exports.default = validateDateServices;
