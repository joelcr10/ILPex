
const getTotalDaysFromDateArray=(dateArray : Array<Date>)=> {
    let totalDays = 0;

    // Iterate over the array starting from the second element
    for (let i = 1; i < dateArray.length; i++) {
        // Convert both dates to milliseconds
        const startDate = new Date(dateArray[i - 1]);
        const endDate = new Date(dateArray[i]);

        // Calculate the difference in milliseconds
        const differenceMillis = Math.abs(endDate.getTime() - startDate.getTime());

        // Convert the difference to days and add to totalDays
        totalDays += Math.ceil(differenceMillis / (1000 * 60 * 60 * 24));
    }

    return totalDays;
}

export default getTotalDaysFromDateArray;