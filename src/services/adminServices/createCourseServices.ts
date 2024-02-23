import Courses from "../../models/courses";


const createCourseServices = async (
    course_name: string,
    course_duration: string,
    course_type_id: number,
    course_link: string,
    day_number: number,
    course_date: Date,
    createdBy: number) =>{
    const newCourse = await Courses.create({
            course_name,
            course_duration,
            course_type_id,
            course_link,
            day_number,
            course_date,
            createdBy
        });

    return newCourse;
}

export default createCourseServices;