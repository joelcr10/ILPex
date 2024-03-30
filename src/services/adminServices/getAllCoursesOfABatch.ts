import Courses from "../../models/courses";

const getAllCoursesOfABatch = async (courseSetId : number) => {
    const daywiseCourses = await Courses.findAll({where : {course_set_id : courseSetId}});

    return daywiseCourses;
}

export default getAllCoursesOfABatch;