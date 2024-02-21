import { Request, Response } from "express";
import Questions from "../../models/questions";
import Trainees from "../../models/trainees";
import Batches from "../../models/batches";
import Assessments from "../../models/assessments";
// ...

const getQuestionsForAssessment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { assessment_id, user_id } = req.query;

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
      return res.status(404).json({ error: "The trainee has not been assigned a batch" });
    }

    // Find assessments for the batch
    const assessmentsList = await Assessments.findAll({
      where: {
        batch_id: trainee.batch_id,
      },
      attributes: ['assessment_id'],
    });

    // Check if assessment_id is present in assessmentsList
    const isAssessmentValid = assessmentsList.some((assessment) => assessment.assessment_id === assessment_id);

    if (!isAssessmentValid) {
      return res.status(404).json({ error: "Assessment not found for the given assessment_id" });
    }

    // Find questions for the specified assessment_id
    const questionsList = await Questions.findAll({
      where: {
        assessment_id: assessment_id,
      },
      attributes: [
        'question_id',
        'question',
        'option_a',
        'option_b',
        'option_c',
        'option_d',
        'correct_answer',
      ],
    });

    res.status(200).json({ questions: questionsList });

  } catch (error: any) {
    console.error("Error during fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getQuestionsForAssessment;
