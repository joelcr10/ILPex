// import Percipio_Assessment from "../../models/percipio_assessment";

// const checkTraineeProgress = async (trainee_id: number, course_id: number, day_number: number) =>{
//     try{
//         const TrackExist = await Percipio_Assessment.findOne({
//             where: {
//                 trainee_id: trainee_id, 
//                 course_id: course_id, 
//                 day_number: day_number
//             }
//         });
    
//         return TrackExist;
//     }catch(error){
//         console.log(error);
//         return null;
//     }
    

// }

// export default checkTraineeProgress;