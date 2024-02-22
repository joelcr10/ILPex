import Assessments from "../../models/assessments";
import { Request,Response } from "express";

const updateAssessment = async(req:Request,res:Response)=>{
    try{
        const {assessment_id,batch_id,assessment_date} = req.body;
        const assessment_batch_found = await Assessments.findOne({where: {assessment_id : assessment_id,batch_id : batch_id}});
        if(!assessment_batch_found){
            const assessment_update = await Assessments.update({batch_id:batch_id}, {where :{assessment_id:assessment_id}});
            return res.status(200).json({message : "Assessment updated"});
        }
        else{
            return res.status(404).json({error : "Same assessment cannot be assigned to the same batch twice"});
        }
    }
    catch(err:any){
        console.log(err);
        return res.status(500).send(err);
    }
};

export default updateAssessment;