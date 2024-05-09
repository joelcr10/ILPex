import Trainees from "../../models/trainees"



const getTraineesCount=async(batch_id:number)=>{

    const traineesCount = await Trainees.count({
        where: { batch_id: batch_id, isActive : true },
      });
    return  traineesCount;
}

export default getTraineesCount;