import Trainees from "../../models/trainees"
import Users from "../../models/users";

const findTraineeNameByTraineeIdServices = async(trainee_id : number) => {
    const findUser = await Trainees.findOne({where : {trainee_id : trainee_id}});
    if(findUser)
    {
        const userName = await Users.findOne({where : {user_id : findUser.user_id}});
        if(userName)
            return userName.user_name;
    }
}

export default findTraineeNameByTraineeIdServices;