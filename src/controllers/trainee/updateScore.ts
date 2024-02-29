import { Request, Response } from "express";
import getTraineeService from "../../services/TraineeServices/assessmentServices/getTraineeService";
import updateExistingResultService from "../../services/TraineeServices/assessmentServices/updateExistingResultService";
import getExistingResultService from "../../services/TraineeServices/assessmentServices/getExistingResultService";
import createResultService from "../../services/TraineeServices/assessmentServices/createResultService";

const updateScore = async (req: Request, res: Response): Promise<any> => {
  try {
    const assessmentId: number = parseInt(req.query.assessment_id as string);
    const userId: number = parseInt(req.query.user_id as string);
    const score: number = parseInt(req.query.score as string);

    if(!assessmentId){
      return res.status(404).json({ error: "assessmentId not defined" });
    }
    if(!userId){
      return res.status(404).json({ error: "userId not defined" });
    }
    if(!score){
      return res.status(404).json({ error: "score not defined" });
    }

    const trainee = await getTraineeService(userId);

    if (!trainee) {
      return res.status(404).json({error:"Trainee not found"});
    }

    // Check if the row already exists for the given assessment_id and trainee_id
    if (trainee.trainee_id) {
      const existingResult = await getExistingResultService(
        assessmentId,
        trainee.trainee_id
      );
      if (existingResult) {
        // Row exists, update high_Score if the new score is higher and increment assessment_attempts
        if (score > existingResult.dataValues.high_score) {
          
          await updateExistingResultService(score, existingResult);
        }

        await existingResult.increment("assessment_attempts");

        return res.status(200).json({ message: "Result updated successfully" });
      } else {
        // Row doesn't exist, create a new row
        await createResultService(assessmentId,trainee.trainee_id,score)
        return res.status(201).json({ message: "Result created successfully" });
      }
    } else {
      return res.status(404).json({ error: "Trainee id not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
 };

export default updateScore;
