
type courseProgressType = {course_name: string, course_duration: string, course_id: number, course_type: string, status: boolean};
interface ProgressType{
    dataValues: {
        trainee_id: number;
        course_id: number;
        day_number: number;
        completion_status: string;
    };
}

interface CoursesType{
    dataValues: {
      course_name: string;
      course_duration: string;
      course_type: string;
      day_number: number;
      course_id: number;
    };
}

const daywiseCourseStatus = (courses: CoursesType[],progress: ProgressType[]) => {

    const courseProgress: courseProgressType[] = [];

    courses.map((course: any)=>{
        let completion_status: boolean = false;
        
        progress.map((traineeCourse) =>{
            if(course.dataValues.course_id===traineeCourse.dataValues.course_id){
                completion_status = true;
                return;
            }
        })

        courseProgress.push({
            course_name: course.dataValues.course_name,
            course_duration: course.dataValues.course_duration,
            course_type: course.dataValues.course_type,
            course_id: course.dataValues.course_id,
            status: completion_status
            
        })

    })

    return courseProgress;

}
 
export default daywiseCourseStatus;