import Roles from "../../../models/roles"

const superAdminPrivileges = async(role_id : number) => {
    const checkForSuperAdminprivileges = await Roles.findOne({where : {role_id : role_id}})
    return checkForSuperAdminprivileges;
}

export default superAdminPrivileges;