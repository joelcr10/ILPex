import Courses from "../../models/courses";

const findCoursesInADayByCurrentDayServices = async(day_id : number, courseSetId : number) => {
    const findCourses = Courses.findAll({where : {day_number : day_id, course_set_id : courseSetId}});
    return findCourses;
}

export default findCoursesInADayByCurrentDayServices;