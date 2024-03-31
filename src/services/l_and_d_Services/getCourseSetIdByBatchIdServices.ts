import Course_Batch_Allocation from "../../models/course_batch_allocation"

const getCourseSetIdByBatchIdServices = async (batch_id : number) => {
    const courseSetInfo = await Course_Batch_Allocation.findOne({where : {batch_id : batch_id}});
    const courseSetId = courseSetInfo.course_set_id;

    return courseSetId;
}

export default getCourseSetIdByBatchIdServices;