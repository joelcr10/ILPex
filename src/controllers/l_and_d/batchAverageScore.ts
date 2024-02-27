import express,{Request,Response} from 'express';
import traineTable from '../../models/trainees'

const app =express();
app.use(express.json());


const batchAverage =async(req:Request,res:Response)=>{
    try{
        const {batch_id} =req.body;
        const batch = await traineTable.findAll({
            attributes:['trainee_id'],
            where:{batch_id:batch_id}
    })
    const numbr = batch.map(item=>
        item.trainee_id);
        let sum =0
        let avg =0
        const len = numbr.length;

    await Promise.all (numbr.map(async item=>{
        let id = await traineTable.findOne({
            attributes:['user_id'],
            where:{trainee_id:item}})
            if(id){
                sum+=id.user_id
                avg = sum/len;
            }
            }))
   
   console.log(avg);
  return res.json(sum);
    }catch(error){
        return res.json(error);
    }

}
export default batchAverage;