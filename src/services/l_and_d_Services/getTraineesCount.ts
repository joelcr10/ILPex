import Trainees from "../../models/trainees"



const getTraineesCount=async(batch_id:number)=>{

    const traineesCount = await Trainees.count({
        where: { batch_id: batch_id },
      });
    return  traineesCount;
}

export default getTraineesCount;