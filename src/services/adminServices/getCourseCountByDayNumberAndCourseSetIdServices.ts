import Courses from "../../models/courses";

const getCourseCountByDayNumberAndCourseSetIdServices = async (dayNumber : number, courseSetId : number) => {
    const courseCount = await Courses.count({
        where: {
          day_number: dayNumber,
          course_set_id : courseSetId
        },
      });
    
      return courseCount;
};

export default getCourseCountByDayNumberAndCourseSetIdServices;