import assessments from "../../models/assessments";
import { Request, Response } from "express";
const getAssessments = async (req: Request, res: Response): Promise<any> => {
  try {
   const plan = await assessments.findAll();
   res.status(200).json({message:plan});

  } catch (error: any) {
    console.error("Error during login:", error);
    res.status(500).json({error: "Internal Server Error" });
  }
};
export default getAssessments;
