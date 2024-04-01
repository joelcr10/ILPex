import Courses from "../../models/courses";
const getCourseCountByDayNumber = async (dayNumber: number) => {
    const courseCount = await Courses.count({
      where: {
        day_number: dayNumber,
      },
    });
  
    return courseCount;
  };
  
  export default getCourseCountByDayNumber;
