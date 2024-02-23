import { Request, Response } from "express";
import getTraineeService from "../../services/TraineeServices/assessmentServices/getTraineeService";
import getBatchService from "../../services/TraineeServices/assessmentServices/getBatchService";
import getAssessmentsService from "../../services/TraineeServices/assessmentServices/getAssessmentsService";

const getAssessments = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userid } = req.query;
    const user_id = parseInt(userid as string);

    // Find trainee by trainee_id
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
        const assessmentsList = await getAssessmentsService(trainee.batch_id);

        // Extract relevant data from the result
        return res
          .status(200)
          .json({ Batch: batch.batch_name, assessments: assessmentsList });
      }
    }
  } catch (error: any) {
    console.error("Error during fetching assessments:", error);
    res.status(500).json({ error: error });
  }
};

export default getAssessments;
