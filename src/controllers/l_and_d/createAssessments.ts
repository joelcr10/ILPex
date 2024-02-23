import { Request,Response } from "express";
import uploadQuestions from "../../services/l_and_d_Services/CreateAssessment/uploadQuestions";
import convert from "../../services/l_and_d_Services/CreateAssessment/convertToJson";
import newAssessment from "../../services/l_and_d_Services/CreateAssessment/uploadAssessment";
import findRole from "../../services/l_and_d_Services/CreateAssessment/findRole";
import findUser from "../../services/l_and_d_Services/CreateAssessment/findUser";
import findBatch from "../../services/l_and_d_Services/CreateAssessment/findBatch";
import findAssessment from "../../services/l_and_d_Services/CreateAssessment/findAssessment";
// interface ExcelRow {
//     Question_Text: string;
//     Option_A : string;
//     Option_B: string;
//     Option_C : string;
//     Option_D : string;
//     Correct_Answer : string
// };

const jsonBatchData = convert('../../../TemporaryFileStorage/Assessment.xlsx');
const createAssessmentController = async(req : Request, res : Response) : Promise<any> => {
    const {user_id,assessment_name,batch_id,assessment_date} = req.body;
    if(!user_id||!assessment_name||!batch_id||!assessment_date){
        return res.status(404).json({error : "Please ensure that the user_id,assessment_name,batch_id and assessment_date is provided"});
    }
    else{
    const user = await findUser(user_id);
    console.log(user);
    const batch = await findBatch(batch_id);
    console.log(batch);
    if(!user||!batch)
    {
        return res.status(404).json({ message : "No such user or no such batch is found"});
    }
        const role_found = await findRole(user);
        console.log(role_found);
        if(role_found && role_found.role_name === "Learning And Development")
            {
                const assessment_batch_found=await findAssessment(assessment_name,batch_id);
                if(!assessment_batch_found){
                    const assessment = await newAssessment(assessment_name,assessment_date,user_id,batch_id);
                    if(!assessment){
                        return res.status(404).json({ message : "Assessment creation failed"});
                    }
                    else{
                        await uploadQuestions(await jsonBatchData,assessment,user_id);
                        return res.status(200).json({message : "Assessment uploaded successfully"});
                    }
                }
                else{
                    return res.status(422).json({error : "Same assessment cannot be assigned to the same batch twice"});
                }
            }
            else{
                return res.status(404).json({error : "The user does not belong to Learning and Development"});
            }
        }
}
export default createAssessmentController;
// const createAssessment = async(req:Request,res:Response,inputFilePath:string='../../../TemporaryFileStorage/Assessment.xlsx') :Promise<any> =>{
//     try{
//         const {user_id,assessment_name,batch_id,assessment_date} = req.body;
//         if(!user_id||!assessment_name||!batch_id||!assessment_date){
//             return res.status(404).json({error : "Please ensure that the user_id,assessment_name,batch_id and assessment_date is provided"});
//         }
//         else{
//         const assessmentWorkBook = XLSX.readFile(inputFilePath);
//         const assessmentSheetName = assessmentWorkBook.SheetNames[0];
//         const assessmentSheet = assessmentWorkBook.Sheets[assessmentSheetName];
        
//         const jsonBatchData: ExcelRow[] = XLSX.utils.sheet_to_json<ExcelRow>(assessmentSheet);
//         const user = await Users.findOne( {where : {user_id : user_id}});
//             console.log("The user is",user);
//         if(!user)
//         {
//             return res.status(404).json({ message : "No such user is found"});
//         }
//         else
//         {
//             const role = await Roles.findOne({where : {role_id : user.role_id}});
//             if(role && role?.role_name === "Learning And Development")
//             {
//                 const batch_found = await Batches.findOne({where : {batch_id : batch_id}});
//                 if(!batch_found)
//                 {
//                     return res.status(404).json({error : "Please ensure that the batch id is correct"});
//                 }
//                 else
//                 {
//                     const assessment_batch_found = await Assessment.findOne({where: {assessment_name : assessment_name,batch_id : batch_found.batch_id}});
//                     if(assessment_batch_found){
//                             return res.status(422).json({error : "Same assessment cannot be assigned to the same batch twice"})
//                         // else{
//                         //     await Assessment.update({batch_id:batch_found.batch_id}, {where :{assessment_name:assessment_name}});
//                         //     return res.status(200).json({message : `Assessment updated for ${batch_found.batch_name}`})
//                         // }
//                         // const duplicate_mapping_found = await Assessments_Batches_Mapping.findOne({where : { assessment_id : assessment_found.assessment_id, batch_id : batch_found.batch_id}});
//                     // if(duplicate_mapping_found)
//                     // {
//                     //     return res.status(404).json({error : "Same assessment cannot be assigned to the same batch twice"});
//                     // }
//                     // else
//                     // {
//                     // await Assessment.update({batch_id:batch_found.batch_id}, {where :{assessment_name:assessment_name}});
//                     // }
//                 }
//                 else{
//                     await create(req,res,assessment_name,assessment_date,user,batch_found,jsonBatchData);
//                     return res.status(200).json({message : "Assessment created successfully"});
//                 }
//                 }
//             }
//             else{
//                 return res.status(404).json({error : "The user does not belong to Learning and Development"});
//             }
//         }
//     }
// }
//     catch(error : any){
//         console.log(error);
//         return res.status(500).send(error);
//     }
//         };

// const create = async(req:Request,res:Response,assessment_name : string,assessment_date : Date,user : Users,batch_found:Batches,jsonBatchData: ExcelRow[])=>{
//     const assessment = await Assessment.create({assessment_name : assessment_name,batch_id:batch_found.batch_id,assessment_date:assessment_date,createdBy : user.user_id},{raw:true});
//     if(!assessment)
//     {
//         return res.status(404).json({ message : "Assessment creation failed"});
//     }
//     else
//     {
//         for(const row of jsonBatchData)
//             {
//                 const {Question_Text, Option_A, Option_B, Option_C,Option_D,Correct_Answer} = row;
//                 console.log(row);
//                 const questions = await Questions.create({ assessment_id: assessment.assessment_id,
//                     question : Question_Text, option_a : Option_A,option_b : Option_B ,option_c : Option_C, option_d: Option_D, correct_answer : Correct_Answer,createdBy : user.user_id},{raw:true});
//             }
//             return res.status(200).json({message : "Assessment created successfully"});
//     }
// }

// export default createAssessment;