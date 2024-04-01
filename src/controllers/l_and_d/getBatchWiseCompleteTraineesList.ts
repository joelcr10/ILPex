import { Request, Response } from 'express';
import Trainees from '../../models/trainees';
import Courses from '../../models/courses';
import Trainee_Progress from '../../models/trainee_progress';
import { Op } from 'sequelize';
import getTraineesByBatchId from '../../services/l_and_d_Services/traineesByBatchIdServices';
import getCompleteTraineeNames from '../../services/l_and_d_Services/completeTraineeNamesService';



const getBatchwiseCompleteTraineesList = async (req: Request, res: Response) => {
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

        // Step 3: Find complete trainees for the given day
        const completeTraineeList: Trainees[] = [];

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
            if (progressCount >= mainCount) {
                completeTraineeList.push(trainee);
            }
        }
        });
        
        // Step 4: Respond with the complete trainee list
        if (completeTraineeList.length === 0 && completeTraineeList === undefined) {
            return res.status(404).json({ error: 'None of the trainees in this batch have completed all courses up to the given day' });
        } else {
            const traineeIds: any[] = completeTraineeList.map(trainee => trainee.trainee_id);
            const traineeNames = await getCompleteTraineeNames(traineeIds);

            const completeTraineeListWithBatch = traineeNames.map(traineeName => ({
                user_id: traineeName.user_id,
                trainee_id: traineeName.trainee_id,
                batch_id: batchId,
                user_name: traineeName.user_name,
        }));

            return res.status(200).json({ CompleteTraineeList: completeTraineeListWithBatch });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
};



export default getBatchwiseCompleteTraineesList;
