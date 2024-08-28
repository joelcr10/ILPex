import getCourseCollectionNameByCourseSetIdServices from "../../controllers/l_and_d/getCourseCollectionNameByCourseSetIdServices";
import getCourseCollectionOfABatchByBatchIDServices from "../../controllers/l_and_d/getCourseCollectionOfABatchByBatchIDServices";
import getTrainees from "../../controllers/l_and_d/getTraineesController";
import Batches from "../../models/batches";
import getTraineeService from "../TraineeServices/assessmentServices/getTraineeService";
import getCoursesByCourseSetIdServices from "../adminServices/getCoursesByCourseSetIdServices";
import getAllTraineesServices from "./getAllTraineesServices";
import getTraineesCount from "./getTraineesCount";
import getTraineeNamesByBatchId from "./traineeNamesByBatchIdServices";
import getTraineeNames from "./traineeNamesService";
import getTraineesByBatchId from "./traineesByBatchIdServices";

const calculateProgress = (start: Date, end: Date): number => {

    const currentDate = new Date();

    if (currentDate < start) {
      return 0;
    }
    if(currentDate>end){
      return 100;
    }

    const totalDuration = end.getTime() - start.getTime();
    const elapsedDuration = currentDate.getTime() - start.getTime();
    const progressPercentage = (elapsedDuration / totalDuration) * 100;
    return Math.min(progressPercentage, 100);
};

const getAllBatch = async () => {
    const batch_details = await Batches.findAll({
        attributes: ['batch_id', 'batch_name', 'start_date', 'end_date', 'isActive','include_saturdays'],
    });

    const batchDetailsWithProgress = await Promise.all(batch_details.map(async (batch) => {
        const { batch_id, batch_name, start_date, end_date, isActive,include_saturdays } = batch;
        const progress = calculateProgress(new Date(start_date), new Date(end_date));
        const noOfTrainees = await getTraineesCount(batch_id); 
        const batchCourseSet = await getCourseCollectionOfABatchByBatchIDServices(batch_id);
        const courseList = await getCoursesByCourseSetIdServices(batchCourseSet.course_set_id);
        const traineesList = await getTraineeNamesByBatchId(batch_id);
        return {
            batch_id,
            batch_name,
            start_date,
            end_date,
            isActive,
            progress,
            noOfTrainees,
            courseList,
            traineesList,
            include_saturdays
        };
    }));

    return batchDetailsWithProgress;
};

export default getAllBatch;
