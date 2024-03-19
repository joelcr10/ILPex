import Users from "../../models/users";

const findTraineeNameByUserIdServices = async(user_id : number) =>  {
    const findTrainee = Users.findOne({where : {user_id : user_id}});

    return findTrainee;
}

export default findTraineeNameByUserIdServices;