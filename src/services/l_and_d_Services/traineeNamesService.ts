import Trainees from '../../models/trainees'; 
import Users from '../../models/users'; 
import findIncompleteCoursesListForEachTrainee from '../adminServices/findIncompleteCoursesListForEachTrainee';

type TraineeInfo = {
  trainee_id?: number;
  user_name: string;
  email: string;
  user_id: number | undefined;
  current_day: number;
  totalCourses: number; 
  incompleteCoursesCount: number;
  incompleteCourseNames: string[];
};

const getTraineeNames = async (traineeIds: number[], courseSetId : number): Promise<TraineeInfo[]> => {
  const traineeNames: TraineeInfo[] = [];

  try {
    for (const traineeId of traineeIds) {
      const trainee = await Trainees.findOne({
        where: {
          trainee_id: traineeId,
        },
        attributes: ['trainee_id', 'user_id','current_day'],
      });

      if (trainee) {
        const user = await Users.findOne({
          where: {
            user_id: trainee.user_id,
          },
          attributes: ['user_name', 'email', 'user_id'],
        });

        if (user) {
          const incompleteCoursesData = await findIncompleteCoursesListForEachTrainee(trainee.trainee_id, trainee.current_day, courseSetId);
          
          // Push the trainee info along with incomplete course data to traineeNames array
          traineeNames.push({
            trainee_id: trainee.trainee_id,
            user_name: user.user_name,
            email: user.email,
            user_id: user.user_id,
            current_day: trainee.current_day,
            totalCourses: incompleteCoursesData.totalCourses,
            incompleteCoursesCount: incompleteCoursesData.incompleteCoursesCount,
            incompleteCourseNames: incompleteCoursesData.incompleteCourseNames,
          });
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
