import { Request,Response } from "express";
import findAssessmentToBatchService from "../../services/l_and_d_Services/updateAssessment/findAssessmentToBatchService";
import findBatchService from "../../services/l_and_d_Services/CreateAssessment/findBatchService";
import updateAssessmentService from "../../services/l_and_d_Services/updateAssessment/updateAssessmentService";

const updateAssessments = async(req:Request,res:Response)=>{
    try{
        const {assessment_id,batch_id,assessment_date} = req.body;
        const assessment_batch_found = await findAssessmentToBatchService(assessment_id,batch_id);
        if(assessment_batch_found){
                return res.status(403).json({error : "Same assessment cannot be assigned to the same batch twice"});
            }
        else
        {
            const batch_found = await findBatchService(batch_id);
            if(batch_found){
                const start_date = new Date(batch_found.start_date);
                const end_date = new Date(batch_found.end_date);
                const due_date = new Date(assessment_date);
                if(start_date < due_date && due_date < end_date){
                    const update_assessment = await updateAssessmentService(assessment_id,batch_id);
                    if(update_assessment){
                        return res.status(202).json({message : `Assessment updated successfully for ${batch_found.batch_name}`});
                    }
                    else{
                        return res.status(500).json({error : "Updation of assessment failed."})
                    }
                    }  
                    else{
                        return res.status(400).json({error : "The due date specified is not in the range of the batch start and end dates"})
                    }
            }
            else{
                    return res.status(404).json({error : "No such batch is found"});
            }
            }
        }
    catch(err:any){
        console.log(err);
        return res.status(500).send(err);
    }
};

export default updateAssessments;