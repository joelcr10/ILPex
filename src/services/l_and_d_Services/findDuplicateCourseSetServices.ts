import Course_Set from "../../models/course_set"

const findDuplicateCourseSetServices = async (course_name : string) => {
    const duplicateCourse = await Course_Set.findOne({where : {course_set_name : course_name}});
    return duplicateCourse;
}

export default findDuplicateCourseSetServices;