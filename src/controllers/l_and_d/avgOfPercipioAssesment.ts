import express,{Request,Response} from 'express';
import traineTable from '../../models/trainees';
import resultTable from '../../models/results'
import findTrainee from '../../services/l_and_d_Services/findTrainee';
import traineList from '../../services/l_and_d_Services/traineList';
import sumOfScore from '../../services/l_and_d_Services/sumOfHighScore';
import batchAverageScore from '../../services/l_and_d_Services/batchAverage';
import batchAverage from '../../services/l_and_d_Services/percipioAverage';
import findTraineesOfABatchServices from '../../services/l_and_d_Services/trainee_analysis/findTraineesOfABatchServices';
import findBatchByBatchIdServices from '../../services/l_and_d_Services/trainee_analysis/findbatchbybatchidservices';
// const app =express();
// app.use(express.json());


const percipioAssesmentAverage =async(req:Request,res:Response)=>{

  
    
    try{
        
        const  id  = parseInt(req.params.id as string);
    if (!id) {
      return res.status(404).json({ message: "Batch id not defined" });
    }

           
            let allAvg = 0
            const traineesList= await findTraineesOfABatchServices(id);

            if(traineesList==null){
                return res.status(404).json({ message: "No Trainees found on the Batch" });
            }

            const len = traineesList.length;
            const{allSum,excellent,good,poor,excellentTraineesList,goodTraineesList,poorTraineesList}=await batchAverage(traineesList)//Service to calculate the batch avg.
            allAvg = allSum/len
            return res.json({average:`${allAvg}`,
                            excellent:`${excellent}`,
                            good:`${good}`,poor:`${poor}`,
                            excellentTraineesList,
                            goodTraineesList,
                            poorTraineesList});
    }catch(error){
        return res.json(error);
    }

}
export default percipioAssesmentAverage;