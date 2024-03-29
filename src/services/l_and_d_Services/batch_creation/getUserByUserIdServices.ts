import Users from "../../../models/users";

const getUserByUserIdServices = async(user_id : string) => {
    const findUser = await Users.findOne({where: {user_id : user_id}});
    return findUser;
}

export default getUserByUserIdServices;