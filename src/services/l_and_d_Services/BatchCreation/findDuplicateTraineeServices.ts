import Users from "../../../models/users";

const findDuplicateTraineeServices = async(Email : string) => {
    const findDuplicateService = await Users.findOne({where : {email : Email}});
    return findDuplicateService;
}

export default findDuplicateTraineeServices;