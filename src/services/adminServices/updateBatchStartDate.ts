import batchTable from '../../models/batches'

const updateStartDate =async(batch:any,startDate:string)=>{
    
    await batch.update({start_date:startDate})
    return batch;
}
export  default updateStartDate;