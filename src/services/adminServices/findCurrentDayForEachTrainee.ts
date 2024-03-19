import calculateTraineeProgress from "../TraineeServices/calculateTraineeProgress";
import individualTraineeProgress from "../TraineeServices/individualTraineeProgress";


const findCurrentDayForEachTrainee = async (trainee_id:any) :Promise<number> =>{

    
    const traineeProgress = await individualTraineeProgress(trainee_id);
    console.log("Individual trainee progress",traineeProgress)

    if(traineeProgress == null){
        return(0);}
    //  else if(traineeProgress.length === 0){
    //     return ("Trainee doesn't have any progress reported");
    // }

    const dayCard = await calculateTraineeProgress(trainee_id);
    console.log("Day Card ", dayCard)

    // Filter dayCard to include only items with status true
    const filteredDayCard = dayCard.filter(item => item.status === true);

    // Find the greatest day_number among filtered items
    const maxDayNumber = Math.max(...filteredDayCard.map(item => item.day_number));
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n  maxDayNumber",maxDayNumber,trainee_id)

return maxDayNumber;
 }

export default findCurrentDayForEachTrainee;
