import traineTable from '../../models/trainees';
const findTrainee =async(id:number)=>{
    console.log('entered')
    const batch = await traineTable.findAll({
        attributes:['trainee_id'],
        where:{batch_id:id}
})
    return batch;
}
export  default findTrainee;