import Users from "../../../models/users";

const createUser = async(Name : string, Role : string, Email : string, Password : string, roleId : number) => {
    const createUser = await Users.create({
        user_name : Name, 
        email : Email,
        password : Password,
        role_id : roleId,
    });

    return createUser;
}

export default createUser;