import Batches from "../../../models/batches";
import Trainees from "../../../models/trainees";

const getBatchService = async(batch_id:number)=>{

   const batch= await Batches.findOne({
    where: {
      batch_id: batch_id,
    },
  });
      
        return batch;
   

      

}
export default getBatchService;