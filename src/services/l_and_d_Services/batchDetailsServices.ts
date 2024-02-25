import Batches from "../../models/batches";


const batchDetailsServices=async(batch_id:number)=>{
    const batch_details=await Batches.findOne({
        where:{batch_id:batch_id},
        attributes: ['batch_name', 'start_date', 'end_date', 'isActive'],
    })

    return batch_details;
}

export default batchDetailsServices;


