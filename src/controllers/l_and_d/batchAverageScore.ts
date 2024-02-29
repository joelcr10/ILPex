import express,{Request,Response} from 'express';
import traineTable from '../../models/trainees';
import resultTable from '../../models/results'

const app =express();
app.use(express.json());


const batchAverage =async(req:Request,res:Response):Promise<Response<any,Record<string,|{message:string}>>>=>{
    try{
        const {batch_id,assessment_id} =req.query;
        const batch = await traineTable.findAll({
            attributes:['trainee_id'],
            where:{batch_id:batch_id}
    })
    const numbr = batch.map(item=>
        item.trainee_id);
        let sum:number =0
        let avg =0
        const len = numbr.length;

    await Promise.all (numbr.map(async item=>{
        const id = await resultTable.findOne({
            // attributes:['high_score'],
            where:{trainee_id:item , assessment_id:assessment_id}})
            if(id){
                sum+=id ?.high_score??0;
                avg = sum/len;
            }
            
            }))
   
   console.log(avg);
  return res.json({message:`Batch Avearage is ${avg}`});
    }catch(error){
        return res.json(error);
    }

}
export default batchAverage;