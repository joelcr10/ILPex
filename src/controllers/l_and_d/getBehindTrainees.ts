import { Request, Response } from 'express';
import Trainees from '../../models/Trainees';
import Courses from '../../models/Courses';
import Trainee_Progress from '../../models/Trainee_Progress';
import getTraineeNames from '../../services/l_and_d_Services/traineeNamesService';

const getIncompleteTraineeListForDay = async (req: Request, res: Response) => {
    try {
        const dayNumber = parseInt(req.params.day_id as string);
        const batchId = parseInt(req.params.batch_id as string);

        // Step 1: Get the list of trainees belonging to the batch
        const traineeList = await Trainees.findAll({
            where: {
                batch_id: batchId,
            },
            attributes: ['trainee_id'],
        });

        if (!traineeList || traineeList.length === 0) {
            return res.status(404).json({ error: 'This batch has no trainees' });
        }

        // Step 2: Calculate the number of courses up to the given day
        let mainCount = 0;
        for (let i = 1; i <= dayNumber-1; i++) {
            const courseCount = await Courses.count({
                where: {
                    day_number: i,
                },
            });
            mainCount += courseCount;
        }

       
// Step 3: Find incomplete trainees for the given day
const incompleteTraineeList: Trainees[] = [];
for (const trainee of traineeList) {
    const progressEntries = await Trainee_Progress.findAll({
        where: {
            trainee_id: trainee.trainee_id,
        },
    });

    console.log("Progress Entries for Trainee:", trainee.trainee_id, progressEntries);

    // Filter progress entries to include only entries up to the given day
    const filteredProgressEntries = progressEntries.filter(entry => entry.day_number < dayNumber);

    // Check if trainee has not completed all courses up to the given day
    if (filteredProgressEntries.length < mainCount) {
        incompleteTraineeList.push(trainee);
    }
}


        // Step 4: Respond with the incomplete trainee list
        if (incompleteTraineeList.length === 0 && incompleteTraineeList===undefined ) {
            return res.status(404).json({ error: 'Every trainee in this batch has completed all courses up to the given day' });
        } else {
            const traineeIds:any[] = incompleteTraineeList.map(trainee => trainee.trainee_id);
            const traineeNames = await getTraineeNames(traineeIds);

            const incompleteTraineeListWithBatch = traineeNames.map(traineeName => ({
                user_id: traineeName.user_id,
                trainee_id: traineeName.trainee_id,
                batch_id: batchId,
                day:traineeName.current_day,
                user_name: traineeName.user_name,
                email: traineeName.email,
                total_courses:traineeName.totalCourses,
                incomplete_courses_count:traineeName.incompleteCoursesCount,
                incomplete_courses:traineeName.incompleteCourseNames
                

            }));

            return res.status(200).json({ IncompleteTraineeList: incompleteTraineeListWithBatch });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
};

export default getIncompleteTraineeListForDay;
