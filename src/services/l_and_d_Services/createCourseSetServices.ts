import { create } from "domain";
import Course_Set from "../../models/course_set"

const createCourseSetServices = async (couse_name : string, createdBy : number) => {
    const createCourseSet = await Course_Set.create({
        course_set_name : couse_name,
        createdBy : createdBy
    });

    return createCourseSet;
}

export default createCourseSetServices;