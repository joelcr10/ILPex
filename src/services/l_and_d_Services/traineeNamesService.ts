import Trainees from '../../models/trainees'; 
import Users from '../../models/users'; 

const getTraineeNames = async (traineeIds: number[]): Promise<{ trainee_id?: number; user_name: string,email:string,user_id:number|undefined}[]> => {
  const traineeNames: { trainee_id?: number; user_name: string,email:string,user_id:number|undefined}[] = [];

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
          attributes: ['user_name','email'],
        });

        if (user) {
          traineeNames.push({ trainee_id: trainee.trainee_id, user_name: user.user_name ,email:user.email,user_id:user.user_id});
        }
      }
    }

    return traineeNames;
  } catch (error) {
    console.error('Error fetching trainee names:', error);
    throw error;
  }
};

export default getTraineeNames;
