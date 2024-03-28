import Course_Set from "../../models/course_set"

const getCourseCollectionNamesServices = async () => {
    const courseSets = await Course_Set.findAll({where : {isActive : true}});
    return courseSets;
}

export default getCourseCollectionNamesServices;