import Course_Set from "../models/course_set";
import Courses from "../models/courses"

const deactivateCoursesInTheListServices = async(course_set_id : number) => {

    const updateCourseStatus = await Course_Set.update(
        {isActive : false},
        {where : {course_set_id : course_set_id}}
    );
    return updateCourseStatus;
}

export default deactivateCoursesInTheListServices;