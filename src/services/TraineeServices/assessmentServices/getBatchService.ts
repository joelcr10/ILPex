import Batches from "../../../models/batches";

const getBatchService = async (batch_id: number) => {
  const batch = await Batches.findOne({
    where: {
      batch_id: batch_id,
    },
  });

  return batch;
};
export default getBatchService;
