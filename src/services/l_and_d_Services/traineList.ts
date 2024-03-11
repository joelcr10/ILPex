

const traineList =async(batch: { trainee_id: number }[])=>{
    
    const traineList = batch.map(item=>
        item.trainee_id);

    return traineList;
}
export  default traineList;