import Course_Type from "../../models/course_type";
import Courses from "../../models/courses";

const getDaywiseCourseServices = async (day_number: number) =>{
    
    const daywiseCourses = await Courses.findAll({
            where: {day_number: day_number},
            attributes: ['course_name','course_duration','course_link',],
            include: [{
                model: Course_Type,
                required: true,
                attributes: ['course_type_id', 'course_type']
            }]
            
        });

    return daywiseCourses;
}

export default getDaywiseCourseServices;