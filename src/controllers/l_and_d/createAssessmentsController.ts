import { Request,Response } from "express";
import uploadQuestionsService from "../../services/l_and_d_services/CreateAssessment/uploadQuestionsService";
import convertToJsonService from "../../services/l_and_d_services/CreateAssessment/convertToJsonService";
import uploadAssessmentService from "../../services/l_and_d_services/CreateAssessment/uploadAssessmentService";
import findRoleService from "../../services/l_and_d_services/CreateAssessment/findRoleService";
import findUserService from "../../services/l_and_d_services/CreateAssessment/findUserService";
import findBatchService from "../../services/l_and_d_services/CreateAssessment/findBatchService";
import uploadAssessmentToBatch from "../../services/l_and_d_Services/CreateAssessment/uploadAssignmentToBatch";
import findAssessmentService from "../../services/l_and_d_Services/CreateAssessment/findAssessmentService";

const jsonBatchData = convertToJsonService('../../../TemporaryFileStorage/Assessment.xlsx');
const createAssessmentController = async(req : Request, res : Response) : Promise<any> => {
    try{
        const {user_id,assessment_name,batch_id,start_date,end_date} = req.body;
    if(!user_id||!assessment_name||!batch_id||!start_date||!end_date){
        return res.status(401).json({error : "Please ensure that the user_id,assessment_name,batch_id,start_date and end-date is provided"});
    }
    else{
    const user = await findUserService(user_id);
    console.log(user);
    const batch = await findBatchService(batch_id);
    console.log(batch);
    if(!user||!batch||!batch.isActive===true)
    {
        return res.status(404).json({ message : "No such user or no such batch is found or currently the batch is inactive"});
    }
        const role_found = await findRoleService(user);
        console.log(role_found);
        if(role_found && role_found.role_name === "Learning And Development")
            {  
             const assessment_found = await findAssessmentService(assessment_name);
             if(assessment_found){
                    return res.status(404).json({error : "A similar assessment has already been created. If you intend to assign it to another batch, please update the batch name from the list of assessments."})
             }
            else{
                const batch_start_date = new Date(batch.start_date);
                console.log(batch_start_date);
                const batch_end_date = new Date(batch.end_date);
                const assessment_start_date = new Date(start_date);
                console.log("it is",assessment_start_date)
                const assessment_end_date = new Date(end_date);
                if(assessment_start_date<assessment_end_date){
                    if(batch_start_date < assessment_start_date && assessment_end_date < batch_end_date){
                        const assessment = await uploadAssessmentService(assessment_name,user);
                        if(!assessment){
                            return res.status(500).json({ message : "Assessment creation failed"});
                        }
                        else{
                            const assessment_to_batch = await uploadAssessmentToBatch(assessment,batch_id,user_id,start_date,end_date);
                            await uploadQuestionsService(await jsonBatchData,assessment,user_id);
                            return res.status(201).json({message : "Assessment uploaded successfully"});
                        }
                }
                else{
                    return res.status(400).json({error : "The due date specified is not in the range of the batch start and end dates"})
                }
                }  
                else{
                    return res.status(400).json({error : "Please ensure the dates are valid"})
                }      
            }       
            }
            else{
                return res.status(401).json({error : "The user does not belong to Learning and Development"});
            }
        }
    }
    catch(err:any){
        console.log(err);
        return res.status(500).send(err);
    }
}
export default createAssessmentController;
