import Trainees from '../../models/trainees'; 

const getTraineesByBatchId = async (batchId: number)=> {
  return await Trainees.findAll({
    where: {
      batch_id: batchId, isActive : true
    },
    attributes: ["trainee_id"],
  });
};

export default getTraineesByBatchId;
