import { Request, Response } from "express";
import Questions from "../../models/questions";

const getQuestionsForAssessment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { assessment_id } = req.query;

    // Find questions for the specified assessment_id
    const questionsList = await Questions.findAll({
      where: {
        assessment_id: assessment_id,
      },
      attributes: [
        'question_id',
        'questions_text',
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
