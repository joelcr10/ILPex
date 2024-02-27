import Users from "../../../models/users";

const createUserServices = async(Name : string, Role : string, Email : string, Percipio_Email : string, Password : string, roleId : number) => {
    
    const findDuplicateUser = await Users.findOne({where : {email : Email}})
    if(findDuplicateUser)
        return false;
    else
    {
        const createUser = await Users.create({
            user_name : Name, 
            email : Email,
            percipio_email : Percipio_Email,
            password : Password,
            role_id : roleId,
        });
    
        return createUser;
    }

}

export default createUserServices;
