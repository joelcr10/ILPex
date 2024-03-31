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
            return res.status(200).json('No Start date or End date or batch name is given ')
        }else {
                    const batch = await findBatch(batchId)//Servie to find batch details.
                    if(batch === null){
                        return res.status(200).json('No Batch found');
                    }
                    else{
                        const oldDate:any = new Date(batch.start_date)
                        if(startDate || BatchName){
                            await updateEndDate(batch,endDate);//Service to update end date.
                            const newDate = await updateStartDate(batch,startDate);//Service to update start date
                            await updateBatchName(batch,BatchName);//Service to update batch name
                        }
                        
                        
                    }
              }
      }catch(err){
        return res.status(404).json(err);
         }
    }
export default batchmanagement;