import Batches from "../../../models/batches";

const createBatchServices = async (
  batch_name: string,
  start_date: string,
  end_date: string,
  userID: number,
  include_saturdays: boolean
) => {
  const creatingBatch = await Batches.create({
    batch_name: batch_name,
    start_date: start_date,
    end_date: end_date,
    include_saturdays: include_saturdays,
    current_day: 0,
    isActive: true,
    createdBy: userID,
    updatedBy: userID,
  });

  return creatingBatch;
};

export default createBatchServices;
