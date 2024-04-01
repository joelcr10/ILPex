
import Courses from "../../models/courses";


const getDaywiseCourseServices = async (day_number: number , courseSetId : number) =>{
    
    const daywiseCourses = await Courses.findAll({
            where: {day_number: day_number, course_set_id : courseSetId},
            attributes: ['course_name','course_duration','course_type','day_number','course_id'],
        });

    return daywiseCourses;
}

export default getDaywiseCourseServices;