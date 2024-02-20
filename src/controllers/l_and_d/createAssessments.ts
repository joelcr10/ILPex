import { Request,Response } from "express";
import Assessment from "../../models/assessments";
// import assessments_batches_mapping from "../../models/assessments_batches_mapping";
import Users from '../../models/users';
import Questions from "../../models/questions";
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
        const batchWorkbook = XLSX.readFile(inputFilePath);
        const batchSheetName = batchWorkbook.SheetNames[0];
        const batchSheet = batchWorkbook.Sheets[batchSheetName];
 
        const jsonBatchData: ExcelRow[] = XLSX.utils.sheet_to_json<ExcelRow>(batchSheet);
        console.log(jsonBatchData);
        const user = await Users.findOne( {where : {user_id : user_id}});
            console.log("The user is",user);
        if(user){
            const assessment = await Assessment.create({assessment_name : assessment_name,assessment_date:assessment_date,created_by : user.user_name},{raw:true});
        if(assessment){
            const assessment_found = await Assessment.findOne({where :{assessment_name:assessment_name}});
        if(assessment_found)
        {
            for(const row of jsonBatchData)
            {
                const {Question_Text, Option_A, Option_B, Option_C,Option_D,Correct_Answer} = row;
                console.log(row);
                const questions = await Questions.create({ assessment_id: assessment_found.assessment_id,questions_text : Question_Text, option_a : Option_A,option_b : Option_B ,option_c : Option_C, option_d: Option_D, correct_answer : Correct_Answer,created_by : user.user_id},{raw:true});
            }
            return res.status(200).json({message : "created"});
    }
    else{
        return res.status(404).json({ message : "No such assessment"});
    }
}
    else{
        return res.status(404).json({ message : "no assessment created"});
    }
}
else{
    return res.status(404).json({ message : "No such user"});
}
    }
    catch(error : any){
        console.log(error);
        return res.status(500).send(error);
    }
        };


export default createAssessment;