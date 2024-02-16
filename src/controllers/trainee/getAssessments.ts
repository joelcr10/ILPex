import { Request, Response } from "express";
import Trainees from "../../models/trainees";
import Assessments from "../../models/assessments";
import Batches from "../../models/batches";
import Assessments_Batches_Mapping from "../../models/assessments_batches_mapping";

const getAssessmentsForTrainee = async (req: Request, res: Response): Promise<any> => {
  try {
    const { trainee_id } = req.query;

    // Find trainee by trainee_id
    const trainee = await Trainees.findOne({
      where: {
        trainee_id: trainee_id,
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
      return res.status(404).json({ error: "Batch not found" });
    }

    // Find assessments for the batch
    const assessmentsList = await Assessments_Batches_Mapping.findAll({
      where: {
        batch_id: trainee.batch_id,
      },
      attributes: ['assessment_id'], // Only retrieve the assessment_id
    });

    const assessmentIds = assessmentsList.map((mapping) => mapping.assessment_id);

    // Find details for each assessment
    const assessments = await Assessments.findAll({
      where: {
        id: assessmentIds,
      },
      attributes: ['assessment_name', 'assessment_date', 'no_of_attempts'],
    });

    // Extract relevant data from the result
    const formattedAssessments = assessments.map((assessment) => ({
      assessment_name: assessment.assessment_name,
      assessment_date: assessment.assessment_date,
      no_of_attempts: assessment.no_of_attempts,
      batch_name: batch.batch_name,
    }));

    res.status(200).json({ assessments: formattedAssessments });

  } catch (error: any) {
    console.error("Error during fetching assessments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getAssessmentsForTrainee;
