import Trainees from "../../../models/trainees";
import Users from "../../../models/users";
import findBatchByBatchNameServices from "./findBatchByBatchNameServices";

const patchUserServices = async(duplicateTraineeStatus : Users, Name : string, Email : string,  batch_name : string) => {
    const updateUserTable = await Users.update({ user_name: Name }, { where: { email: Email } });
    const findBatch = await findBatchByBatchNameServices(batch_name);
    const batchId = findBatch?.batch_id;
    const updateTraineeTable = await Trainees.update({batch_id : batchId}, {where : {user_id : duplicateTraineeStatus.user_id}});
    return updateTraineeTable;
}

export default patchUserServices;
