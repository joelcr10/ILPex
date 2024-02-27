import Courses from "../../models/courses";




const createCourseServices = async (courseList: any) =>{

    const newCourse = await Courses.bulkCreate(courseList);

    if(newCourse){
        return newCourse;
    }

    return null;

}

export default createCourseServices;