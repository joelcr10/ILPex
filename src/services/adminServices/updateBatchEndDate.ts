import batchTable from '../../models/batches'

const updateEndDate =async(batch:any,endDate:string)=>{
    
    await batch.update({end_date:endDate})
    return batch;
}
export  default updateEndDate;