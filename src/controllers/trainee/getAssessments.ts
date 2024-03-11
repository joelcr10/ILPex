import { Request, Response } from "express";
import getTraineeService from "../../services/TraineeServices/assessmentServices/getTraineeService";
import getBatchService from "../../services/TraineeServices/assessmentServices/getBatchService";
import getAssessmentBatchAllocation from "../../services/TraineeServices/assessmentServices/getAssessmentBatchAllocationService";
import getAssessmentDetailsService from "../../services/TraineeServices/assessmentServices/getAssessmentDetailsService";

const getAssessments = async (req: Request, res: Response): Promise<any> => {
  try {
    const userid = req.params.id;

    if (!userid) {
      return res.status(404).json({ message: "User id not defined" });
    }
    const user_id = parseInt(userid as string);

    // Find trainee by user_id
    const trainee = await getTraineeService(user_id);

    if (!trainee) {
      return res.status(404).json({ error: "Trainee not found" });
    } else {
      // Find batch for the trainee
      const batch = await getBatchService(trainee.batch_id);

      if (!batch) {
        return res
          .status(404)
          .json({ error: "The trainee has not been assigned a batch" });
      } else {
        // Find assessments for the batch
        const assessmentsList = await getAssessmentBatchAllocation(
          trainee.batch_id
        );

        if (!assessmentsList){
          return res
            .status(404)
            .json({error: "No assessments have been assigned"});
        } else {
         


          const assessmentIds = assessmentsList.map(
            (assessment) => assessment.assessment_id
          );
          const assessmentNames =await  getAssessmentDetailsService(assessmentIds);
          const combinedAssessments = assessmentsList.map((assessment) => {
            const matchingName = assessmentNames.find(
              (name) => name.assessment_id === assessment.assessment_id
            );
            return {
              assessment_id: assessment.assessment_id,
              assessment_name: matchingName
                ? matchingName.assessment_name
                : null,
              end_date: assessment.end_date,
            };
          });

          // Extract relevant data from the result
          const result = {
            Batch: batch.batch_name,
            assessments: combinedAssessments,
          };

          return res.status(200).json(result);
        }
      }
    }
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getAssessments;

// import { Request, Response } from "express";
// import getTraineeService from "../../services/TraineeServices/assessmentServices/getTraineeService";
// import getBatchService from "../../services/TraineeServices/assessmentServices/getBatchService";
// import getAssessmentBatchAllocation from "../../services/TraineeServices/assessmentServices/getAssessmentBatchAllocationService";
// import getAssessmentDetailsService from "../../services/TraineeServices/assessmentServices/getAssessmentDetailsService";
// import Results from "../../models/results";

// const getAssessments = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const userid = req.params.id;

//     if (!userid) {
//       return res.status(404).json({ message: "User id not defined" });
//     }
//     const user_id = parseInt(userid as string);

//     // Find trainee by user_id
//     const trainee = await getTraineeService(user_id);

//     if (!trainee) {
//       return res.status(404).json({ error: "Trainee not found" });
//     } else {
//       // Find batch for the trainee
//       const batch = await getBatchService(trainee.batch_id);

//       if (!batch) {
//         return res
//           .status(404)
//           .json({ error: "The trainee has not been assigned a batch" });
//       } else {
//         // Find assessments for the batch
//         const assessmentsList = await getAssessmentBatchAllocation(
//           trainee.batch_id
//         );

//         if (!assessmentsList) {
//           return res
//             .status(404)
//             .json({ error: "No assessments have been assigned" });
//         } else {
//           // Get results for the trainee
//           //const results = await checkIfAssessmentAttended(assessmentsList,)
//           const results = await Results.findAll({
//             where: {
//               assessment_batches_allocation_id: assessmentsList.map(
//                 (assessment) => assessment.assessment_batch_allocation_id
//               ),
//               trainee_id: trainee.trainee_id,
//             },
//           });

//           // Remove assessments with existing results
//           const filteredAssessmentsList = assessmentsList.filter(
//             (assessment) =>
//               !results.some(
//                 (result) =>
//                   result.assessment_batches_allocation_id ===
//                     assessment.assessment_batch_allocation_id
//               )
//           );

//           const assessmentIds = filteredAssessmentsList.map(
//             (assessment) => assessment.assessment_id
//           );
//           const assessmentNames = await getAssessmentDetailsService(
//             assessmentIds
//           );
//           const combinedAssessments = filteredAssessmentsList.map(
//             (assessment) => {
//               const matchingName = assessmentNames.find(
//                 (name) => name.assessment_id === assessment.assessment_id
//               );
//               return {
//                 assessment_id: assessment.assessment_id,
//                 assessment_name: matchingName
//                   ? matchingName.assessment_name
//                   : null,
//                 end_date: assessment.end_date,
//               };
//             }
//           );

//           // Extract relevant data from the result
//           const result = {
//             Batch: batch.batch_name,
//             assessments: combinedAssessments,
//           };

//           return res.status(200).json(result);
//         }
//       }
//     }
//   } catch (error: any) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };




// export default getAssessments;



