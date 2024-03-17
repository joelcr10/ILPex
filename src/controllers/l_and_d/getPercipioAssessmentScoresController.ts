import { Request,Response } from "express";
import courseByCourseIdService from "../../services/TraineeServices/courseByCourseIdService";
import percipioAssessmentScoreService from "../../services/TraineeServices/percipioAssessmentScoreService";

const getPercipioAssessmentController =async(req:Request,res:Response)=>{
    try{
        const trainee_id :number=parseInt(req.params.trainee_id as string);
        const course_id :number=parseInt(req.params.course_id as string);

        if(!trainee_id || !course_id){
            return res.status(400).json({message:"Please ensure that the trainee_id and course_id is provided"});
        }
        else{
            const course = await courseByCourseIdService(course_id);
            if(course_id){
                const assessment = await percipioAssessmentScoreService(trainee_id,course_id);
                if(assessment){
                    return res.status(200).json({data : {course,assessment}})
                }
                else{
                    return res.status(404).json({error : "No such assessment found"})
                }
            }
            else{
                return res.status(404).json({error : "No such course found"});
            }

        }
    }
    catch(err){
        return res.status(500).json({message:err});
    }
}

export default getPercipioAssessmentController;