import Course_Set from "../../models/course_set"

const getCourseCollectionNameByCourseSetIdServices = async (course_set_id : number) => {
    const courseSetName = await Course_Set.findOne({where : {course_set_id : course_set_id}})
    return courseSetName;
}

export default getCourseCollectionNameByCourseSetIdServices;