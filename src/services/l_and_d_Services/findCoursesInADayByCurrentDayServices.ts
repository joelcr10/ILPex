import Courses from "../../models/courses";

const findCoursesInADayByCurrentDayServices = async(day_id : number) => {
    const findCourses = Courses.findAll({where : {day_number : day_id}});
    return findCourses;
}

export default findCoursesInADayByCurrentDayServices;