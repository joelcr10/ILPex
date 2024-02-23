import { Request, Response } from "express";
import Results from "../../models/results";
import Trainees from "../../models/trainees";
import { IntegerDataType } from "sequelize";

const updateScore = async (req: Request, res: Response): Promise<any> => {
  try {
    const assessmentId: number = parseInt(req.query.assessment_id as string);
    const userId: number = parseInt(req.query.user_id as string);
    const score: number = parseInt(req.query.score as string);
   

        // Find trainee by trainee_id
        const trainee = await Trainees.findOne({
            where: {
              user_id: userId,
            },
          });
      
          if (!trainee) {
            return res.status(404).json({ error: "Trainee not found" });
          }

    // Check if the row already exists for the given assessment_id and trainee_id
    const existingResult = await Results.findOne({
      where: {
        assessment_id: assessmentId,
        trainee_id: trainee.trainee_id,
      },
    });
console.log("existing result",existingResult);
    if (existingResult) {
        // if(existingResult.dataValues.high_Score){
      // Row exists, update high_Score if the new score is higher
      console.log(score,'\n\n\n\n\n\n\n\n\n',existingResult.dataValues.high_Score);
            if (score > existingResult.dataValues.high_Score) {
                    await existingResult.update({
                    high_Score: score,
                    });
      }
    // }

      // Increment assessment_attempts
      await existingResult.increment('assessment_attempts');

      return res.status(200).json({ message: 'Result updated successfully' });
    } 
    else {
      // Row doesn't exist, create a new row
      await Results.create({
        assessment_id: assessmentId,
        trainee_id: trainee.trainee_id,
        first_Score: score,
        high_Score: score,
        assessment_attempts: 1,
        createdAt: new Date(),
      });

      return res.status(200).json({ message: 'Result created successfully' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default updateScore;
