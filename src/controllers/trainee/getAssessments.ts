import { Request, Response } from "express";
import { Op } from "sequelize";
import Assessment_Batch_Allocation from "../../models/assessment_batch_allocation";
import Results from "../../models/results";
import getAssessmentDetailsService from "../../services/TraineeServices/assessmentServices/getAssessmentDetailsService";
import getBatchService from "../../services/TraineeServices/assessmentServices/getBatchService";
import getTraineeService from "../../services/TraineeServices/assessmentServices/getTraineeService";

const getAssessments = async (req: Request, res: Response): Promise<any> => {
  try {
    const userid = req.params.id;

    if (!userid) {
      return res.status(404).json({ message: "User id not defined" });
    }
    const user_id = parseInt(userid as string);

    // Find trainee by user_id
    const trainee = await getTraineeService(user_id);

    if (!trainee) {
      return res.status(404).json({ error: "Trainee not found" });
    } else {
      // Find batch for the trainee
      const batch = await getBatchService(trainee.batch_id);

      if (!batch) {
        return res
          .status(404)
          .json({ error: "The trainee has not been assigned a batch" });
      } else {
        // Find assessments for the batch
        const currentDate = new Date();

        const assessmentsList = await Assessment_Batch_Allocation.findAll({
          where: {
            batch_id: trainee.batch_id,
            start_date: { [Op.lte]: currentDate },
            end_date: { [Op.gte]: currentDate },
          },
          attributes: [
            "assessment_batch_allocation_id",
            "assessment_id",
            "end_date",
            "start_date",
            "number_of_attempts",
          ],
        });

        if (!assessmentsList) {
          return res
            .status(404)
            .json({ error: "No assessments have been assigned" });
        } else {
          // Get results for the trainee
          if (!(trainee.trainee_id === undefined)) {
            const results = await Results.findAll({
              where: {
                trainee_id: trainee.trainee_id,
                [Op.and]: assessmentsList.map((assessment) => ({
                  assessment_batches_allocation_id:
                    assessment.assessment_batch_allocation_id,
                  assessment_attempts: {
                    [Op.gte]: assessment.number_of_attempts,
                  },
                })),
              },
            });

            // Remove assessments with existing results
            const filteredAssessmentsList = assessmentsList.filter(
              (assessment) =>
                !results.some(
                  (result) =>
                    result.assessment_batches_allocation_id ===
                    assessment.assessment_batch_allocation_id
                )
            );
            // Fetching assessment_attempts from Results table for each assessment in filteredAssessmentsList
            const assessmentsAttempts = await Promise.all(
              filteredAssessmentsList.map(async (assessment) => {
                // Find the corresponding result for the current assessment
                const result = results.find(
                  (result) =>
                    result.assessment_batches_allocation_id ===
                    assessment.assessment_batch_allocation_id
                );

                if (result) {
                  // Subtracting the attempts made from the total allowed attempts
                  const attempts_left =
                    assessment.number_of_attempts - result.assessment_attempts;

                  return {
                    assessment_id: assessment.assessment_id,
                    attempts_left: Math.max(attempts_left, 0), 
                    end_date:assessment.end_date
                  };
                } else {
                  // If no result is found, assume all attempts are left
                  return {
                    assessment_id: assessment.assessment_id,
                    attempts_left: assessment.number_of_attempts,
                    end_date:assessment.end_date

                  };
                }
              })
            );

            // Define assessmentIds
            const assessmentIds = filteredAssessmentsList.map(
              (assessment) => assessment.assessment_id
            );

            // Merge the attempts_left with filteredAssessmentsList
            const Assessments = filteredAssessmentsList.map(
              (assessment, index) => ({
                ...assessment,
                assessment_id: assessmentsAttempts[index].assessment_id, // Assign assessment_id from assessmentIds
                attempts_left: assessmentsAttempts[index].attempts_left,
                end_date:assessmentsAttempts[index].end_date,
              })
            );

            const assessmentNames = await getAssessmentDetailsService(
              assessmentIds
            );
            const combinedAssessments = Assessments.map((assessment) => {
              const matchingName = assessmentNames.find(
                (name) => name.assessment_id === assessment.assessment_id
              );
              return {
                assessment_id: assessment.assessment_id,
                assessment_name: matchingName
                  ? matchingName.assessment_name
                  : null,
                end_date: assessment.end_date,
                attempts_left: assessment.attempts_left,
              };
            });

            // Extract relevant data from the result
            const result = {
              Batch: batch.batch_name,
              assessments: combinedAssessments,
            };

            return res.status(200).json(result);
          }
        }
      }
    }
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getAssessments;
