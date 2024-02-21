// import { Request, Response } from "express";
// import Results from "../../models/";

// const getResults = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const assessmentId: number = parseInt(req.query.assessment_id as string);
//     const traineeId: number = parseInt(req.query.trainee_id as string);
//     const score: number = parseInt(req.query.score as string);

//     // Check if the row already exists for the given assessment_id and trainee_id
//     const existingResult = await Results.findOne({
//       where: {
//         assessment_id: assessmentId,
//         trainee_id: traineeId,
//       },
//     });

//     if (existingResult) {
//       // Row exists, update high_score if the new score is higher
//       if (score > existingResult.high_score) {
//         await existingResult.update({
//           high_score: score,
//         });
//       }

//       // Increment assessment_attempts
//       await existingResult.increment('assessment_attempts');

//       return res.status(200).json({ message: 'Result updated successfully' });
//     } else {
//       // Row doesn't exist, create a new row
//       await Results.create({
//         assessment_id: assessmentId,
//         trainee_id: traineeId,
//         first_score: score,
//         high_score: score,
//         assessment_attempts: 1,
//         createdAt: new Date(),
//       });

//       return res.status(200).json({ message: 'Result created successfully' });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export default getResults;
