import { Request, Response } from "express";
import Trainees from "../../models/trainees";
import Assessments from "../../models/assessments";
import Batches from "../../models/batches";

const getAssessments = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user_id } = req.query;

    // Find trainee by trainee_id
    const trainee = await Trainees.findOne({
      where: {
        user_id: user_id,
      },
    });

    if (!trainee) {
      return res.status(404).json({ error: "Trainee not found" });
    }

    // Find batch for the trainee
    const batch = await Batches.findOne({
      where: {
        batch_id: trainee.batch_id,
      },
    });

    if (!batch) {
      return res.status(404).json({ error: "The trainee has not been assigned a batch"});
    }

    // Find assessments for the batch
    const assessmentsList = await Assessments.findAll({
      where: {
        batch_id: trainee.batch_id,
      },
      attributes: ['assessment_id','assessment_name', 'assessment_date'], 
    });



    // Extract relevant data from the result
    return res.status(200).json({Batch:batch.batch_name, assessments:assessmentsList });

  } catch (error: any) {
    console.error("Error during fetching assessments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getAssessments;
