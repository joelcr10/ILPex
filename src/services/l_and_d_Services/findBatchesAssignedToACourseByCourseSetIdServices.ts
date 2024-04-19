import Course_Batch_Allocation from "../../models/course_batch_allocation"

const findBatchesAssignedToACourseByCourseSetIdServices = async(course_set_id : number) => {
    const findBatches = await Course_Batch_Allocation.findAll({where : {
        course_set_id : course_set_id
    }});
    return findBatches;
}

export default findBatchesAssignedToACourseByCourseSetIdServices;