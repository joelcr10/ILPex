import resultTable from '../../models/results'
const batchAverage =async(listTraine:number[],)=>{
    let array = []
            let highScore:number=0
            let sum:number =0
            let avg =0
            let allSum:number =0
            let excellent =0
            let good =0
            let poor =0
    await Promise.all (listTraine.map(async item=>{
          const count = await resultTable.findAll({
          where:{trainee_id:item}})
          let leng =count.length
          if(leng !== 0){
              console.log('entered to function')
              let leng =count.length
              sum =0;
              await Promise.all(count.map(async term=>{
                  highScore = term ?.high_score??0
                  sum += highScore;
              }))
              avg = sum/leng;
              if(avg >=95){
                  excellent+=1
              }
              else if(avg >=25){
                  good+=1
              }else{
                  poor+=1
              }
              allSum += avg;
               console.log(allSum)
              }
          }))
          return {allSum,excellent,good,poor}
}
export  default batchAverage;