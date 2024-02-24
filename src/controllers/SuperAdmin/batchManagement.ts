import express,{Request,Response} from 'express';
import batchTable from '../../models/batches'
import findBatch from '../../services/adminServices/findBatch';
import updateEndDate from '../../services/adminServices/updateBatchEndDate';
import updateStartDate from '../../services/adminServices/updateBatchStartDate';
const batchmanagement = async(req:Request,res:Response) =>
{
    try{
        const{batchId,endDate,startDate} = req.body;
        if(!batchId){
            return res.status(200).json('No batch id provided')
        }
        else if(!endDate && !startDate){
            return res.status(200).json('No Start date or End date is given')
        }else {

                    const batch = await findBatch(batchId)//Servie to find batch details.
                    if(batch == null){
                        return res.status(200).json('No Batch found');
                    }
                    else{
                        if(endDate){
                            await updateEndDate(batch,endDate);//Service to update end date.
                            return res.status(200).json('End Date Updated');
                        }
                        else if(startDate){
                            await updateStartDate(batch,startDate);//Service to update start date.
                            return res.status(200).json('Start Date Updated');
                        }
                    }
              }
      }catch(err){
        return res.status(404).json(err);
         }
    }
           

export default batchmanagement;