import{Request,Response} from 'express';
import Assessment from "../../../models/assessments";
import Batches from "../../../models/batches";
import Questions from "../../../models/questions";
import Users from "../../../models/users";
import { ExcelRow } from "./uploadQuestions";


const newAssessment = async(req:Request,res:Response,assessment_name : string,assessment_date : Date,user : Users,batch_found:Batches,uploadQuestions: ExcelRow[])=>{
    const assessment = await Assessment.create({assessment_name : assessment_name,batch_id:batch_found.batch_id,assessment_date:assessment_date,createdBy : user.user_id},{raw:true});
    if(!assessment)
    {
        return res.status(404).json({ message : "Assessment creation failed"});
    }
    else
    {
        for(const row of uploadQuestions)
            {
            const {Question_Text, Option_A, Option_B, Option_C,Option_D,Correct_Answer} = row;
            console.log(row);
            const questions = await Questions.create({ assessment_id: assessment.assessment_id,
            question : Question_Text, option_a : Option_A,option_b : Option_B ,option_c : Option_C, option_d: Option_D, correct_answer : Correct_Answer,createdBy : user.user_id},{raw:true});
            }
            return res.status(200).json({message : "Assessment created successfully"});
    }
}

export default newAssessment;