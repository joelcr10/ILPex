import { Request, Response } from "express";
import getQuestionsService from "../../services/TraineeServices/assessmentServices/getQuestionsService";

const getQuestionsForAssessment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { assessmentId } = req.query;
    if (!assessmentId) {
      return res.status(404).json({ message: "Assessment id not defined" });
    }
    const assessment_id = parseInt(assessmentId as string);

    // Find questions for the specified assessment_id
    const questionsList = getQuestionsService(assessment_id);
    if (questionsList) {
      return res.status(200).json({ questions: questionsList });
    } else {
      return res.status(404).json({
        questions:
          "Questions for this assessment cannot be found. Please try again.",
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getQuestionsForAssessment;
