import Trainees from "../../models/trainees"



const getTraineesCount=(batch_id:number)=>{

    const traineesCount = Trainees.count({
        where: { batch_id: batch_id },
      });

    return  traineesCount;

}

export default getTraineesCount;