const updateStartDate =async(batch:any,startDate:string)=>{
    const start_date : Date = new Date(startDate)
    await batch.update({start_date:start_date})
    return batch;
}
export  default updateStartDate;