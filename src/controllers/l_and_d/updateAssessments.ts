import { Request,Response } from "express";
import findAssessment from "../../services/l_and_d_Services/CreateAssessment/findAssessment";
import findBatch from "../../services/l_and_d_Services/CreateAssessment/findBatch";
import updateAssessment from "../../services/l_and_d_Services/updateAssessment";

const updateAssessments = async(req:Request,res:Response)=>{
    try{
        const {assessment_id,batch_id,assessment_date} = req.body;
        const assessment_found = await findAssessment(assessment_id);
        if(assessment_found?.batch_id===batch_id){
            return res.status(403).json({error : "Same assessment cannot be assigned to the same batch twice"});
        }
        else{
            const batch_found = await findBatch(batch_id);
            if(batch_found){
                console.log("The batch is ",batch_found)
                if(batch_found.start_date<assessment_date && batch_found.end_date>assessment_date){
                    const update_assessment = await updateAssessment(assessment_id,batch_id);
                    if(update_assessment){
                        return res.status(202).json({message : `Assessment updated successfully for {batch_found.batch_name}`});
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