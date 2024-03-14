import Batches from "../../models/batches";
import Trainees from "../../models/trainees";
import Users from "../../models/users";

const getAllTraineesServices = async (
    offset: number,
    sortKey: string,
    sortOrder: string,
    batchId?: number // Optional batchId parameter
) => {
    const queryOptions: any = {
        include: [
            {
                // Join Batches model
                model: Batches,
                required: true,
                attributes: ['batch_name']
            },
            {
                // Join User model
                model: Users,
                required: true,
                attributes: ['user_name']
            },
        ],
        order: [[sortKey, sortOrder]],
        offset: offset,
        attributes: ['trainee_id', 'user_id', 'batch_id'],
    };

    // Apply batch_id filter if provided
    if (batchId !== 0) {
        queryOptions.where = { batch_id: batchId };
    }

    const trainees = await Trainees.findAll(queryOptions);

    return trainees;
}

export default getAllTraineesServices;
