import { Request, Response } from "express";
// import getTraineeService from "../../services/TraineeServices/assessmentServices/getTraineeService";
// import getBatchService from "../../services/TraineeServices/assessmentServices/getBatchService";
// import getAssessmentsService from "../../services/TraineeServices/assessmentServices/getAssessmentsService";
import Trainees from "../../models/trainees";
import Batches from "../../models/batches";
import Assessments from "../../models/assessments";
import Assessment_Batch_Allocation from "../../models/assessment_batch_allocation";

const getAssessments = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userid } = req.query;
    if (!userid) {
      return res.status(404).json({ message: "User id not defined" });
    }
    const user_id = parseInt(userid as string);

    // Find trainee by trainee_id
    const trainee = await Trainees.findOne({
      where: {
        user_id: user_id,
      },
    });

    if (!trainee) {
      return res.status(404).json({error: "Trainee not found"});
    } else {
      // Find batch for the trainee
      const batch = await Batches.findOne({
        where: {
          batch_id: trainee.batch_id,
        },
      });

      if (!batch) {
        return res
          .status(404)
          .json({ error: "The trainee has not been assigned a batch" });
      } else {

      const test = await Assessment_Batch_Allocation.findOne({where:{assessment_id: 1}});
         
      // Find assessments for the batch
      //   const assessmentsList = await Assessment_Batch_Allocation.findAll({
      //     where: {
      //       batch_id: trainee.batch_id,
      //     },
      //     attributes: ['assessment_id', 'end_date'], 
      //   });
      //   if (!assessmentsList) {
      //     return res
      //       .status(404)
      //       .json({ error: "No assessments have been assigned " });
      //   } else {
      //     // Extract relevant data from the result
      //     return res
      //       .status(200)
      //       .json({ Batch: batch.batch_name, assessments: assessmentsList });
      //   }
      }
    }
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getAssessments;
