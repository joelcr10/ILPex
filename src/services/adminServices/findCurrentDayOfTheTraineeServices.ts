import Trainees from "../../models/trainees";

const findCurrentDayOfTheTraineeServices = async (trainee_id: number) => {
  const traineeData = await Trainees.findOne({
    where: { trainee_id: trainee_id },
  });
  const currentDay = traineeData.current_day;
  return currentDay;
};

export default findCurrentDayOfTheTraineeServices;
