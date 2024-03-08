import Courses from "../../../models/courses";

const findNumberOfCoursesByDayNumber = async(currentDay : number) => {
    const findNumberOfCourses = await Courses.count({where : {day_number : currentDay}});
    if(findNumberOfCourses)  
        return findNumberOfCourses;
    else
        return (
            {
                status : 404,
                error : 'No courses are allotted for this particular day'
            }
        )
}

export default findNumberOfCoursesByDayNumber;