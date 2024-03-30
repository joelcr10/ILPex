import Courses from "../../models/courses"

const getCoursesByCourseSetIdServices = async (course_set_id : number) => {
    const courses = await Courses.findAll({where : {course_set_id : course_set_id}});
    const courseSetNames = courses.map(coursesObj => coursesObj.course_name);
    const uniqueDayNumbers = [...new Set(courses.map(course => course.day_number))];
    const numberOfDays = Math.max(...uniqueDayNumbers);
    const numberOfCourses = courseSetNames.length;
    return {
        courseSetNames : courseSetNames,
        numberOfDays : numberOfDays,
        numberOfCourses : numberOfCourses
    }
}

export default getCoursesByCourseSetIdServices;