const getWorkingDaysInclSaturdayServices = (
  startDate: Date,
  endDate: Date
): Date[] => {
  let dateArray: Date[] = [];

  const startDateFormatted = startDate.toLocaleDateString("en-CA");
  const endDateFormatted = endDate.toLocaleDateString("en-CA");

  let currentDate = new Date(startDateFormatted);
  let lastDate = new Date(endDateFormatted);

  // Get an array of all days between startDate and endDate
  while (currentDate <= lastDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Filter out Sundays from the array
  dateArray = dateArray.filter((date) => date.getDay() !== 0);

  return dateArray;
};

export default getWorkingDaysInclSaturdayServices;
