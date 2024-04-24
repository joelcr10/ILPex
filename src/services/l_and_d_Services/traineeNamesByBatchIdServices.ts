import Trainees from '../../models/trainees'; 
import Users from '../../models/users';

const getTraineeNamesByBatchId = async (batchId: number)=> {
    const trainee_id = await Trainees.findAll({
        where: {
        batch_id: batchId, isActive : true
        },
        attributes: ["user_id"],
    });

    console.log("Trainee ID---------> ", trainee_id);

    const traineeIdsArray = trainee_id.map(trainee => trainee.user_id);

    console.log("Trainee ID Array ----> ", traineeIdsArray)
    const traineeUserNames = await Users.findAll({
        where: {
            user_id: traineeIdsArray
        },
        attributes: ["user_name"]
    });

    const userNamesArray = traineeUserNames.map(trainee => trainee.user_name);

    return userNamesArray;
};

export default getTraineeNamesByBatchId;
