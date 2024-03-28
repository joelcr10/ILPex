import Trainees from '../../models/trainees'; 
import Users from '../../models/users'; 

type TraineeInfo = {
  trainee_id?: number;
  user_name: string;
  user_id: number | undefined;

};

const getCompleteTraineeNames = async (traineeIds: number[]): Promise<TraineeInfo[]> => {
  const daywiseCompleteTraineeNames: TraineeInfo[] = [];

  try {
    for (const traineeId of traineeIds) {
      const trainee = await Trainees.findOne({
        where: {
          trainee_id: traineeId,
        },
        attributes: ['trainee_id', 'user_id'],
      });

      if (trainee) {
        const user = await Users.findOne({
          where: {
            user_id: trainee.user_id,
          },
          attributes: ['user_name'],
        });

        if (user) {
          
          daywiseCompleteTraineeNames.push({
            trainee_id: trainee.trainee_id,
            user_name: user.user_name,
            user_id: trainee.user_id,
          });
        }
      }
    }

    return daywiseCompleteTraineeNames;
  } catch (error) {
    console.error('Error fetching trainee names:', error);
    throw error;
  }
};

export default getCompleteTraineeNames;
