import Batches from "../../models/batches";
import getTraineesCount from "./getTraineesCount";

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
        attributes: ['batch_id', 'batch_name', 'start_date', 'end_date', 'isActive'],
    });

    const batchDetailsWithProgress = await Promise.all(batch_details.map(async (batch) => {
        const { batch_id, batch_name, start_date, end_date, isActive } = batch;
        const progress = calculateProgress(new Date(start_date), new Date(end_date));
        const noOfTrainees = await getTraineesCount(batch_id); 
        return {
            batch_name,
            start_date,
            end_date,
            isActive,
            progress,
            noOfTrainees,
        };
    }));

    return batchDetailsWithProgress;
};

export default getAllBatch;
