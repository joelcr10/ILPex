import Trainees from "../../../models/trainees";

const createTraineeServices = async(user_id : number, batch_id : number, userID : number ) => {
    const createTrainee = await Trainees.create({
            user_id: user_id,
            batch_id: batch_id, // Use the batch_id from the createdBatch
            isActive: true,
            createdBy: userID,
            modifiedBy: userID
    });

    return createTrainee;
}

export default createTraineeServices;