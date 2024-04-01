import Courses from "../../models/courses";

const createCourseServices = async (courseList: any, course_set_id : number) =>{

    // const newCourse = await Courses.bulkCreate(courseList);

    const newCourseList = await courseList.map(course => ({
        ...course,
        course_set_id: course_set_id
    }));

    const newCourse = await Courses.bulkCreate(newCourseList);
    if(newCourse){
        return newCourse;
    }

    return null;

}

export default createCourseServices;