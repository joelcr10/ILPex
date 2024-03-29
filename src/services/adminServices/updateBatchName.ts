const updateBatchName =async(batch:any,BatchName:string)=>{
    
    await batch.update({batch_name:BatchName})
    return batch;
}
export  default updateBatchName;