import Trainees from "../../../models/trainees";

//getting the trainee details from the Trainees table
const getTraineeService = async (user_id: number) => {
  const trainee = await Trainees.findOne({
    where: {
      user_id: user_id,
    },
  });
  return trainee;
};
export default getTraineeService;
