import Trainee_Progress from "../../models/trainee_progress";

const findTraineeProgressOfADay = async (
  trainee_id: number,
  current_day: number
) => {
  const progressCount = await Trainee_Progress.count({
    distinct: true,
    col: "course_id",
    where: { trainee_id: trainee_id, day_number: current_day },
  });
  return progressCount;
};

export default findTraineeProgressOfADay;
