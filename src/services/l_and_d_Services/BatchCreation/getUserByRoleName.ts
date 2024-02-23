import Roles from "../../../models/roles";

const getUserByRoleName = async(Role : string) => {
    const findRole = await Roles.findOne({where : {role_name : Role}});
    return findRole;
}

export default getUserByRoleName;