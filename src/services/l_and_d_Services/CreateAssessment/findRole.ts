import Roles from "../../../models/roles";
import Users from "../../../models/users";

const findRole = async(user:Users)=>{
    const role = await Roles.findOne({where : {role_id : user.role_id}});
    return role;
}

export default findRole;
