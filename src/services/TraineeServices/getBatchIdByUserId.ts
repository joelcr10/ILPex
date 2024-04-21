import Trainees from "../../models/trainees";

const getBatchIdByUserId = async (user_id: number) => {
    const findTraineeDetails = await Trainees.findOne({
        where: { user_id: user_id },
    });
    const batch_id = findTraineeDetails.batch_id;

    return batch_id;
};

export default getBatchIdByUserId;
