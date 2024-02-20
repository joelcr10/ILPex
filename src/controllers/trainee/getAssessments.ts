import { Request, Response } from "express";
import Trainees from "../../models/trainees";
import Assessments from "../../models/assessments";
import Batches from "../../models/batches";
// import Assessments_Batches_Mapping from "../../models/assessments_batches_mapping";


// const getAssessments = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const traineeId: number = parseInt(req.query.trainee_id as string);

//     // Find trainee details with associated batch
//     const trainee = await Trainees.findOne({
//       where: { trainee_id: traineeId },
//       include: [{
//         model: Batches,
//         attributes: ['batch_name'],
//       }],
//     });

//     if (!trainee) {
//       return res.status(404).json({ message: 'Trainee not found' });
//     }

//     // Find assessments mapped to the trainee's batch
//     const assessments = await Assessments_Batches_Mapping.findAll({
//       where: { batch_id: trainee.batch_id },
//       attributes: ['assessment_id'],
//       include: [{
//         model: Assessments,
//         attributes: ['assessment_name', 'no_of_attempts', 'assessment_date'],
//       }],
//     });

//     if (!assessments || assessments.length === 0) {
//       return res.status(404).json({ message: 'No assessments found for the trainee\'s batch' });
//     }
  
//     return res.status(200).json(assessments);
//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export default getAssessments;


