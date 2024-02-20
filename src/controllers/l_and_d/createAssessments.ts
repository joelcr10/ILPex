import { Request,Response } from "express";
import Assessment from "../../models/assessments";
// import Assessments_Batches_Mapping from "../../models/assessments_batches_mapping";
import Users from '../../models/users';
import Questions from "../../models/questions";
import Roles from '../../models/roles';
import Batches from "../../models/batches";
import * as XLSX from 'xlsx';
interface ExcelRow {
    Question_Text: string;
    Option_A : string;
    Option_B: string;
    Option_C : string;
    Option_D : string;
    Correct_Answer : string
};

const createAssessment = async(req:Request,res:Response,inputFilePath:string='../../../TemporaryFileStorage/Assessment.xlsx') :Promise<any> =>{
    try{
        const {user_id,assessment_name,batch_name,assessment_date} = req.body;
        const assessmentWorkBook = XLSX.readFile(inputFilePath);
        const assessmentSheetName = assessmentWorkBook.SheetNames[0];
        const assessmentSheet = assessmentWorkBook.Sheets[assessmentSheetName];
        
        const jsonBatchData: ExcelRow[] = XLSX.utils.sheet_to_json<ExcelRow>(assessmentSheet);
        const user = await Users.findOne( {where : {user_id : user_id}});
            console.log("The user is",user);
        if(!user)
        {
            return res.status(404).json({ message : "No such user is found"});
        }
        else
        {
            const role = await Roles.findOne({where : {role_id : user.role_id}});
            if(role && role?.role_name === "Learning And Development")
            {
                const batch_found = await Batches.findOne({where : {batch_name : batch_name}});
                if(!batch_found)
                {
                    return res.status(404).json({error : "Please ensure that the batch name is correct"});
                }
                else
                {
                    const assessment_found = await Assessment.findOne({where: {assessment_name : assessment_name}});
                    if(assessment_found){
                        // const duplicate_mapping_found = await Assessments_Batches_Mapping.findOne({where : { assessment_id : assessment_found.assessment_id, batch_id : batch_found.batch_id}});
                    // if(duplicate_mapping_found)
                    // {
                    //     return res.status(404).json({error : "Same assessment cannot be assigned to the same batch twice"});
                    // }
                    // else
                    // {
                    // await create(req,res,assessment_name,assessment_date,user,user_id,batch_found,jsonBatchData);
                    // }
            }
                else{
                    await create(req,res,assessment_name,assessment_date,user,user_id,batch_found,jsonBatchData);
                }
                }
            }
            else{
                return res.status(404).json({error : "The user does not belong to Learning and Development"});
            }
            return res.status(200).json({message : "returned"})
        }
    }
    catch(error : any){
        console.log(error);
        return res.status(500).send(error);
    }
        };

const create = async(req:Request,res:Response,
    assessment_name : string,
    assessment_date : Date,
    user : Users,
    user_id : number,
    batch_found:Batches,
    jsonBatchData: ExcelRow[])=>{
    const assessment = await Assessment.create({
        assessment_name : assessment_name,
        batch_id:batch_found.batch_id,
        assessment_date:assessment_date,
        createdBy : user.user_id,
        user_id : user_id},{raw:true});
    // const assessmentBatches = await Assessments_Batches_Mapping.create({
    //     batch_id : batch_found.batch_id,
    //     assessment_id : assessment.assessment_id}); //doubt
    if(!assessment)
    {
        return res.status(404).json({ message : "Assessment creation field"});
    }
    else
    {
        for(const row of jsonBatchData)
            {
                const {Question_Text, Option_A, Option_B, Option_C,Option_D,Correct_Answer} = row;
                console.log(row);
                const questions = await Questions.create({ 
                    assessment_id: assessment.assessment_id,
                    questions_text : Question_Text, 
                    option_a : Option_A,
                    option_b : Option_B ,option_c : Option_C, option_d: Option_D, correct_answer : Correct_Answer,createdBy : user.user_id},{raw:true});
            }
            return res.status(200).json({message : "Assessment created successfully"});
    }
}

export default createAssessment;