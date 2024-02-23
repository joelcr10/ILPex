import{Request,Response} from 'express';
import Assessment from "../../../models/assessments";
import Batches from "../../../models/batches";
import Questions from "../../../models/questions";
import Users from "../../../models/users";
import { ExcelRow } from "./convertToJson";
import convert from './convertToJson';
import uploadQuestions from './uploadQuestions';


const newAssessment = async(assessment_name : string,assessment_date : Date,user : Users,batch_id:number)=>{
    const assessment = await Assessment.create({assessment_name : assessment_name,batch_id:batch_id,assessment_date:assessment_date,createdBy : user.user_id},{raw:true});
    return assessment;
}

export default newAssessment;