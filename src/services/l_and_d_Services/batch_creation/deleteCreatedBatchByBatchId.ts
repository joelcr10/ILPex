import Batches from "../../../models/batches";
import Course_Batch_Allocation from "../../../models/course_batch_allocation"

const deleteCreatedBatchByBatchId = async (batch_id_global : number, course_batch_allocation_id_global : number) => {
    const deleteCourseBatchAllocation = await Course_Batch_Allocation.destroy({
        where: {
            course_set_id: course_batch_allocation_id_global,
            batch_id: batch_id_global
        }
    });

    const deleteBatch = await Batches.destroy({where : {batch_id : batch_id_global}});
    return deleteBatch;

}

export default deleteCreatedBatchByBatchId;