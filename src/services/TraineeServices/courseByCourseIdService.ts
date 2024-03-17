import Courses from "../../models/courses";

const courseByCourseIdService=async(course_id : number)=>{
    const course = await Courses.findOne({where : {course_id : course_id}});
    return course;
}

export default courseByCourseIdService;