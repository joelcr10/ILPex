import { Request,Response } from "express";
import findAssessmentToBatchService from "../../services/l_and_d_Services/updateAssessment/findAssessmentToBatchService";
import findBatchService from "../../services/l_and_d_Services/CreateAssessment/findBatchService";
import updateAssessmentService from "../../services/l_and_d_Services/updateAssessment/updateAssessmentService";

const updateAssessments = async(req:Request,res:Response)=>{
    try{
        const {user_id,assessment_id,batch_id,start_date,end_date} = req.body;
        const assessment_batch_found = await findAssessmentToBatchService(assessment_id,batch_id);
        if(assessment_batch_found){
                return res.status(403).json({error : "Same assessment cannot be assigned to the same batch twice"});
            }
        else
        {
            const batch = await findBatchService(batch_id);
            if(batch){
                const batch_start_date = new Date(batch.start_date);
                console.log(batch_start_date);
                const batch_end_date = new Date(batch.end_date);
                const assessment_start_date = new Date(start_date);
                const assessment_end_date = new Date(end_date);
                if(assessment_start_date < assessment_end_date){
                    if(batch_start_date <  assessment_start_date && assessment_end_date < batch_end_date){
                        const update_assessment = await updateAssessmentService(user_id,assessment_id,batch_id,start_date,end_date);
                        if(update_assessment){
                            return res.status(202).json({message : `Assessment updated successfully for ${batch.batch_name}`});
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
                            return res.status(400).json({error : "Please ensure that the dates are vaild"})
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