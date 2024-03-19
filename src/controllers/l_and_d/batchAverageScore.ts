import express,{Request,Response} from 'express';
import findTrainee from '../../services/l_and_d_Services/findTrainee';
import traineList from '../../services/l_and_d_Services/traineList';
import batchAverageScore from '../../services/l_and_d_Services/batchAverage';
const app =express();
app.use(express.json());
const batchAverage =async(req:Request,res:Response)=>{
    try{
        const  id  = parseInt(req.params.id as string);
    if (!id) {
      return res.status(404).json({ message: "Batch id not defined" });
    }
            const batch:any = await findTrainee(id)//Service to Find Trainees.
            let allAvg = 0
            const listTraine = await traineList(batch)//Service to make array of trainee list.
            const len = listTraine.length;
            const{allSum,excellent,good,poor}=await batchAverageScore(listTraine)//Service to calculate the batch avg.
            allAvg = allSum/len
            return res.json({average:`${allAvg}`,excellent:`${excellent}`,good:`${good}`,poor:`${poor}`});
    }catch(error){
        return res.json(error);
    }
}
export default batchAverage;