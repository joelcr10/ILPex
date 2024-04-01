const updateEndDate =async(batch:any,endDate:any)=>{
    const start_date:Date = new Date(endDate)
    await batch.update({end_date:start_date})
    return batch;
}
export  default updateEndDate;