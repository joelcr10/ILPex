import{Request,Response} from 'express';
import Assessment from "../../../models/assessments";
import Batches from "../../../models/batches";
import Questions from "../../../models/questions";
import Users from "../../../models/users";
import { ExcelRow } from "./convertToJson";
import convert from './convertToJson';

const uploadQuestions = async(jsonBatchData:ExcelRow[],assessment:Assessment,user_id:number)=>{
    for(const row of jsonBatchData)
    {
    const {Question_Text, Option_A, Option_B, Option_C,Option_D,Correct_Answer} = row;
    console.log(row);
    const questions = await Questions.create({ assessment_id: assessment.assessment_id,
    question : Question_Text, option_a : Option_A,option_b : Option_B ,option_c : Option_C, option_d: Option_D, correct_answer : Correct_Answer,createdBy : user_id},{raw:true});
    }
    // return questions;
}

export default uploadQuestions;