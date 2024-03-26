const validateDateServices = (startDateString : string, endDateString : string) => {
    const startDate : Date = new Date(startDateString);
    const endDate : Date = new Date(endDateString);

    if(endDate < startDate)
        return false;
    else
        return true;
}

export default validateDateServices;