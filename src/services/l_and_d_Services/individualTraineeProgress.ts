import Results from "../../models/results";

const individualTraineeProgressService = async(trainee_id: number)=>{
    const trainee = await Results.findOne({where : {trainee_id : trainee_id}});
    return trainee;
}

export default individualTraineeProgressService;