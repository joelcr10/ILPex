import Course_Batch_Allocation from "../../../models/course_batch_allocation";
import Course_Set from "../../../models/course_set"
 
const courseBatchAllocationServices = async (batch_id : number, course_collection_name : string, userID : number) => {
    const findCourseSet = await Course_Set.findOne({where : {course_set_name : course_collection_name}});
    const courseSetId = findCourseSet.course_set_id;
    const allocateCourseToABatch = Course_Batch_Allocation.create({
        course_set_id : courseSetId,
        batch_id : batch_id,
        createdBy : userID
    });
 
    return allocateCourseToABatch;
}
 
export default courseBatchAllocationServices;