import Roles from "../../../models/roles";

const getUserByRoleNameServices = async(Role : string) => {
    const findRole = await Roles.findOne({where : {role_name : Role}});
    return findRole;
}

export default getUserByRoleNameServices;