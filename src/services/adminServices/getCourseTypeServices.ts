import Course_Type from "../../models/course_type";



const getCourseTypeServices = async (course_type_id: number) =>{
    const courseType = await Course_Type.findOne({ where: {course_type_id: course_type_id}});

    return courseType;
}


export default getCourseTypeServices;