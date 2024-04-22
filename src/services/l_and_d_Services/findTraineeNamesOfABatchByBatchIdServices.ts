import Trainees from "../../models/trainees";
import Users from "../../models/users";

const findTraineeNamesOfABatchByBatchIdServices =async(batch_id : number) => {
    const findTrainees = await Trainees.findAll({ where: { batch_id: batch_id, isActive : true } });
    const userIds = findTrainees.map(trainee => trainee.user_id);

    const userDetails = await Users.findAll({
    attributes: ['user_id', 'email', 'user_name'],
    where: { user_id: userIds }
    });

    const userDetailsDataValues = userDetails.map(user => user.dataValues);
    console.log("User Details ----------> ", userDetailsDataValues);

    return userDetailsDataValues;
    
}

export default findTraineeNamesOfABatchByBatchIdServices;