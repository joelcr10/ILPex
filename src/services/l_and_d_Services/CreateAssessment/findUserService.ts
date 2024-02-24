import Users from "../../../models/users";

const findUserService = async(user_id : number)=>{
    const user = await Users.findOne({where : {user_id : user_id}});
    return user;
}

export default findUserService;