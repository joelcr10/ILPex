import Batches from "../../../models/batches";

const createBatch = async(batch_name : string, start_date : string, end_date : string, userID : number) => {
    const creatingBatch = await Batches.create({
        batch_name: batch_name,
        start_date: start_date,
        end_date: end_date,
        current_day: 0,
        isActive: true,
        createdBy: userID,
        updatedBy: userID
    });

    return creatingBatch;
}

export default createBatch;