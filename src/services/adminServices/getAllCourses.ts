import Courses from "../../models/courses";

const getAllCourses = async () =>{
    
    const daywiseCourses = await Courses.findAll();

    return daywiseCourses;
}

export default getAllCourses;