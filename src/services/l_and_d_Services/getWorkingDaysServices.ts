
// const sdate:Date=new Date("2024-1-1");
// const edate:Date=new Date("2024-2-1");


const getWorkingDaysServices=(startDate:Date,endDate:Date):Date[]=>{

    let dateArray: Date[] = [];

    let currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate()+1);
    let lastDate=new Date(endDate);
    lastDate.setDate(lastDate.getDate()+1);

    //get array all days between startDate and endDate
    while (currentDate <= lastDate) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate()+1);
    }

    //filter sundays from array
    dateArray=dateArray.filter(date => date.getDay() !== 1);
    return dateArray;

}

export default getWorkingDaysServices;
