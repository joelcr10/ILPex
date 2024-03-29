import { Request, Response } from "express";
import courseByCourseIdService from "../../services/TraineeServices/courseByCourseIdService";
import percipioAssessmentScoreService from "../../services/TraineeServices/percipioAssessmentScoreService";

const getPercipioAssessmentController = async (req: Request, res: Response) => {
    try {
        const trainee_id: number = parseInt(req.params.trainee_id as string);
        
        if (!trainee_id) {
            return res.status(400).json({ message: "Please ensure that the trainee_id is provided" });
        }

        const assessments = await percipioAssessmentScoreService(trainee_id);
        
        if (assessments && assessments.length > 0) {
            const combinedData = await Promise.all(assessments.map(async (assessment) => {
                const course_id = assessment.course_id;
                const course = await courseByCourseIdService(course_id);
                
                // Extracting required fields from assessments and course
                if(course)
                return {
                    course_id: course.course_id,
                    course_name: course.course_name,
                    day_number: course.day_number,
                    high_score: assessment.high_score,
                    trainee_id: assessment.trainee_id
                };
            }));

            return res.status(200).json({ data: combinedData });
        } else {
            return res.status(404).json({ error: "No assessments found for the trainee" });
        }
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

export default getPercipioAssessmentController;
