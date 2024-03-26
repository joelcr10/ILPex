
import Percipio_Assessment from '../../models/percipio_assessment'
import Trainees from '../../models/trainees'
import findTraineeNameByUserIdServices from './findTraineeNameByUserIdServices'

const batchAverage =async(listTraine:Trainees[],)=>{
    let array = []
            let highScore:number=0
            let sum:number =0
            let avg =0
            let allSum:number =0
            let excellent =0
            let good =0
            let poor =0

            let excellentTraineesList : TraineeObject [] = [];
            let goodTraineesList : TraineeObject [] = [];
            let poorTraineesList : TraineeObject [] = [];

            interface TraineeObject {
                user_id: number | undefined,
                trainee_id: any,
                user_name : string
            }
    
    await Promise.all (listTraine.map(async item=>{

        const count = await Percipio_Assessment.findAll({
          where:{trainee_id:item.trainee_id}})

            const trainee_id = item.dataValues.trainee_id;
            const user_id = item.dataValues.user_id;
            const findTraineeName = await findTraineeNameByUserIdServices(user_id);

            const traineeObject = {
                user_id: findTraineeName.user_id,
                trainee_id: trainee_id,
                user_name : findTraineeName.user_name
            };

          let leng =count.length

          if(leng !== 0){

              let leng =count.length
              sum =0;
              await Promise.all(count.map(async term=>{
                  highScore = term ?.high_score??0
                  sum += highScore;
              }))

              
              avg = sum/leng;
              if(avg >=95){
                  excellent+=1;
                  excellentTraineesList.push(traineeObject);
              }
              else if(avg >=25){
                  good+=1
                  goodTraineesList.push(traineeObject);
              }else{
                  poor+=1;
                  poorTraineesList.push(traineeObject);
              }
              allSum += avg;
              }
          }))

          return {allSum,excellent,good,poor,excellentTraineesList,goodTraineesList,poorTraineesList}
}
export  default batchAverage;