import express,{Request,Response} from 'express';
import traineTable from '../../models/trainees';
import resultTable from '../../models/results'

const app =express();
app.use(express.json());


const batchAverage =async(req:Request,res:Response):Promise<Response<any,Record<string,|{message:string}>>>=>{
    try{
        const  id  = req.params.id;
    if (!id) {
      return res.status(404).json({ message: "Batch id not defined" });
    }
        const batch = await traineTable.findAll({
            attributes:['trainee_id'],
            where:{batch_id:id}
    })
    const numbr = batch.map(item=>
        item.trainee_id);
        let sum:number =0
        let avg =0
        const len = numbr.length;
        let allAvg = 0
        let allSum:number =0
        let array = []
        let highScore:number=0
        let excellent =0
        let good =0
        let poor =0

        await Promise.all (numbr.map(async item=>{
         const count = await resultTable.findAll({
            where:{trainee_id:item}})
            console.log(item)
            let leng =count.length
            if(leng !== 0){
                console.log('entered to function')
                let leng =count.length
                sum =0;
                await Promise.all(count.map(async term=>{
                    highScore = term ?.high_score??0
                    sum += highScore;
                }))
                if(avg >=95){
                    excellent+=1
                }
                else if(avg >=25){
                    good+=1
                }else{
                    poor+=1
                }
                avg = sum/leng;
                allSum += avg;
                 console.log(allSum)
                
            }
        
            
        }))
    
   allAvg = allSum/len
   return res.json({average:`${allAvg}`,excellent:`${excellent}`,good:`${good}`,poor:`${poor}`});
    }catch(error){
        return res.json(error);
    }

}
export default batchAverage;