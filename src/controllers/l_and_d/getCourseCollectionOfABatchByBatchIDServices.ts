import Course_Batch_Allocation from "../../models/course_batch_allocation";
import Course_Set from "../../models/course_set";

const getCourseCollectionOfABatchByBatchIDServices = async (batch_id : number) => {
    const courseSets = await Course_Batch_Allocation.findOne({where : {batch_id : batch_id}});
    return courseSets;
}

export default getCourseCollectionOfABatchByBatchIDServices;