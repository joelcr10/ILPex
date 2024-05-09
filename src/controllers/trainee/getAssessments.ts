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
    }

    // Find batch for the trainee
    const batch = await getBatchService(trainee.batch_id);

    if (!batch) {
      return res
        .status(404)
        .json({ error: "The trainee has not been assigned a batch" });
    }

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

    if (!assessmentsList || assessmentsList.length === 0) {
       const result = {
        assessments : []
      }
      return res.status(200).json(result);
    }

    // Get results for the trainee
    const results = await Results.findAll({
      where: {
        trainee_id: trainee.trainee_id,
        [Op.and]: assessmentsList.map((assessment) => ({
          assessment_batches_allocation_id:
            assessment.assessment_batch_allocation_id,
          assessment_attempts: { [Op.gte]: assessment.number_of_attempts },
        })),
      },
    });

    // Remove assessments with existing results
    const filteredAssessmentsList = assessmentsList.filter((assessment) => {
      const result = results.find(
        (result) =>
          result.assessment_batches_allocation_id ===
          assessment.assessment_batch_allocation_id
      );
      // Include the assessment if it's not found in results
      return !result;
    });

    // Check if assessmentIds is not empty and is an array
    if (filteredAssessmentsList.length > 0) {
      // Fetching assessment_attempts from Results table for each assessment in filteredAssessmentsList
      const assessmentsAttempts = await Promise.all(
        filteredAssessmentsList.map(async (assessment) => {
          // Find the corresponding result for the current assessment
          const result = await Results.findOne({
            where: {
              assessment_batches_allocation_id:
                assessment.assessment_batch_allocation_id,
              trainee_id: trainee.trainee_id,
            },
          });

          if (result) {
            // Subtracting the attempts made from the total allowed attempts
            const attempts_left =
              assessment.number_of_attempts - result.assessment_attempts;
            return {
              assessment_id: assessment.assessment_id,
              attempts_left: Math.max(attempts_left, 0),
              end_date: assessment.end_date,
            };
          } else {
            // If no result is found, assume all attempts are left
            return {
              assessment_id: assessment.assessment_id,
              attempts_left: assessment.number_of_attempts,
              end_date: assessment.end_date,
            };
          }
        })
      );

      // Merge the attempts_left with filteredAssessmentsList
      const Assessments = filteredAssessmentsList.map(
        (assessment: any, index: string | number) => ({
          ...assessment,
          assessment_id: assessmentsAttempts[index].assessment_id, // Assign assessment_id from assessmentIds
          attempts_left: assessmentsAttempts[index].attempts_left,
          end_date: assessmentsAttempts[index].end_date,
        })
      );

      const assessmentIds = Assessments.map(
        (assessment: { assessment_id: any }) => assessment.assessment_id
      );

      const assessmentNames = await getAssessmentDetailsService(assessmentIds);
      const combinedAssessments = Assessments.map((assessment) => {
        const matchingName = assessmentNames.find(
          (name) => name.assessment_id === assessment.assessment_id
        );
        return {
          assessment_id: assessment.assessment_id,
          assessment_name: matchingName ? matchingName.assessment_name : null,
          end_date: assessment.end_date,
          attempts_left: assessment.attempts_left,
        };
      });
      // Extract relevant data from the result
      const filteredAssessments = combinedAssessments.filter(
        (assessment) => assessment.attempts_left > 0
      );

      const result = {
        Batch: batch.batch_name,
        assessments: filteredAssessments,
      };

      return res.status(200).json(result);
    } else {
      const result = {
        assessments : []
      }
      return res.status(200).json(result);
    }
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export default getAssessments;
