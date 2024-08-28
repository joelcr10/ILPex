const updateBatchName =async(batch:any,BatchName:string,include_saturdays : boolean)=>{
    
    await batch.update({batch_name:BatchName})
    await batch.update({include_saturdays:include_saturdays})
    return batch;
}
export  default updateBatchName;