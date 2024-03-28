import express,{Request,Response} from 'express';
import findBatch from '../../services/adminServices/findBatch';
import updateEndDate from '../../services/adminServices/updateBatchEndDate';
import updateStartDate from '../../services/adminServices/updateBatchStartDate';
import updateBatchName from '../../services/adminServices/updateBatchName';
const batchmanagement = async(req:Request,res:Response) =>
{
    try{
        const{batchId,endDate,startDate,BatchName} = req.body;
        if(!batchId){
            return res.status(200).json('No batch id provided')
        }
        else if(!endDate && !startDate && !BatchName){
            return res.status(200).json('No Start date or End date is given or batch name')
        }else {
                    const batch = await findBatch(batchId)//Servie to find batch details.
                    if(batch === null){
                        return res.status(200).json('No Batch found');
                    }
                    else{
                        const oldDate:any = new Date(batch.start_date)
                        if(endDate){
                            await updateEndDate(batch,endDate);//Service to update end date.
                            return res.status(200).json('End Date Updated');
                        }
                        else if(startDate){
                            const newDate = await updateStartDate(batch,startDate);//Service to update start date
                            const newStartDate:any = new Date(newDate.start_date);
                            const batch_end_date:any = new Date(newDate.end_date);
                            const updated = Math.abs(newStartDate - oldDate)
                            const newEndDate = new Date(batch_end_date.getTime() + updated);
                            const dateTimeString = newEndDate.toISOString();
                            await updateEndDate(newDate,dateTimeString.split("T")[0])
                            return res.status(200).json({message:'Start Date Updated'});
                        }
                        else if(BatchName){
                            await updateBatchName(batch,BatchName);//Service to update batch name
                            return res.status(200).json({message:'Batch Name Updated'});
                        }
                    }
              }
      }catch(err){
        return res.status(404).json(err);
         }
    }
export default batchmanagement;