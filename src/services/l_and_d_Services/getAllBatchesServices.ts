import Batches from "../../models/batches";


const calculateProgress = (start: Date, end: Date, current: Date): number => {
    const totalDuration = end.getTime() - start.getTime();
    const elapsedDuration = current.getTime() - start.getTime();
    const progressPercentage = (elapsedDuration / totalDuration) * 100;
    return Math.min(progressPercentage, 100);
  };


const getAllBatch=async()=>{

    const currentDate = new Date();

    const batch_details=await Batches.findAll({
        attributes: ['batch_name', 'start_date', 'end_date', 'isActive'],
    })
     
    const batchDetailsWithProgress = batch_details.map(batch => {
        const { batch_name, start_date, end_date, isActive } = batch;
        const progress = calculateProgress(new Date(start_date), new Date(end_date), currentDate);
    
        return {
          batch_name,
          start_date,
          end_date,
          isActive,
          progress,
        };
      });

    return batchDetailsWithProgress;
}

export default getAllBatch;