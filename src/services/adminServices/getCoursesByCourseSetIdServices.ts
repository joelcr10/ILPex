import Courses from "../../models/courses"

const getCoursesByCourseSetIdServices = async (course_set_id : number) => {
    const courses = await Courses.findAll({where : {course_set_id : course_set_id}});
    const courseSetNames = courses.map(coursesObj => coursesObj.course_name);
    return courseSetNames;
}

export default getCoursesByCourseSetIdServices;