import { Request, Response } from 'express';
import Trainees from '../../models/Trainees';
import Courses from '../../models/Courses';
import Trainee_Progress from '../../models/Trainee_Progress';
import getTraineeNames from '../../services/l_and_d_Services/traineeNamesService';
import { Op } from 'sequelize';
import Users from '../../models/users';
import getTraineesByBatchId from '../../services/l_and_d_Services/traineesByBatchIdServices';

const getIncompleteTraineeListForDay = async (req: Request, res: Response) => {
    try {
        const dayNumber = parseInt(req.params.day_id as string);
        const batchId = parseInt(req.params.batch_id as string);

        // Step 1: Get the list of trainees belonging to the batch
        const traineeList = await getTraineesByBatchId(batchId);


        if (!traineeList || traineeList.length === 0) {
            return res.status(404).json({ error: 'This batch has no trainees' });
        }

        // Step 2: Calculate the number of courses up to the given day
        const mainCount = await Courses.count({
            where: {
                day_number: { [Op.lte]: dayNumber - 1 },
            },
        });


        // Define a type for progress counts
        interface ProgressCounts {
            [traineeId: number]: number;
        }

        // Step 3: Find incomplete trainees for the given day
        const incompleteTraineeList: Trainees[] = [];

        // Fetch all progress entries for the trainees in a single query
        const progressEntries = await Trainee_Progress.findAll({
            where: {
                trainee_id: traineeList.map( trainee => trainee.trainee_id ),
                day_number: { [Op.lt]: dayNumber }
            }
        });

        // Initialize an empty object to store progress counts
        const progressCounts: ProgressCounts = {};

        // Count the number of progress entries for each trainee
        progressEntries.forEach(entry => {
            progressCounts[entry.trainee_id] = (progressCounts[entry.trainee_id] || 0) + 1;
        });

        // Filter trainee list based on progress counts
       
        traineeList.forEach(trainee => {
            if(trainee.trainee_id){
            const progressCount = progressCounts[trainee.trainee_id] || 0;
            if (progressCount === undefined || progressCount < mainCount) {
                incompleteTraineeList.push(trainee);
            }
        }
        });




        // Step 4: Respond with the incomplete trainee list
        if (incompleteTraineeList.length === 0 && incompleteTraineeList === undefined) {
            return res.status(404).json({ error: 'Every trainee in this batch has completed all courses up to the given day' });
        } else {
            const traineeIds: any[] = incompleteTraineeList.map(trainee => trainee.trainee_id);
            const traineeNames = await getTraineeNames(traineeIds);

            const incompleteTraineeListWithBatch = traineeNames.map(traineeName => ({
                user_id: traineeName.user_id,
                trainee_id: traineeName.trainee_id,
                batch_id: batchId,
                day: traineeName.current_day,
                user_name: traineeName.user_name,
                email: traineeName.email,
                total_courses: traineeName.totalCourses,
                incomplete_courses_count: traineeName.incompleteCoursesCount,
                incomplete_courses: traineeName.incompleteCourseNames


            }));

            return res.status(200).json({ IncompleteTraineeList: incompleteTraineeListWithBatch });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
};



export default getIncompleteTraineeListForDay;
