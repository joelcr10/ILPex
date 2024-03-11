import Trainees from '../../models/trainees';
import Trainee_Progress from '../../models/trainee_progress';

const checkTraineeProgress = async (
  traineeList: Trainees[],
  dayNumber: number,
  courseCount: number
): Promise<Trainees[]> => {
  const incompleteTraineeList: Trainees[] = [];

  for (const trainee of traineeList) {
    const progressEntries = await Trainee_Progress.findAll({
      where: {
        trainee_id: trainee.trainee_id,
        day_number: dayNumber,
      },
    });

    if (progressEntries.length !== courseCount) {
      incompleteTraineeList.push(trainee);
    }
  }

  return incompleteTraineeList;
};

export default checkTraineeProgress;
