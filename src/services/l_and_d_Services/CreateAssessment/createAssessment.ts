import { Request,Response } from "express";
import Assessment from "../../../models/assessments";
import Users from '../../../models/users';
import Roles from '../../../models/roles';
import Batches from "../../../models/batches";
import Upload from './uploadQuestions';
import newAssessment from "./newAssessment";

const createAssessment = async(req:Request,res:Response) :Promise<any> =>{
    try{
        const {user_id,assessment_name,batch_id,assessment_date} = req.body;

        if(!user_id||!assessment_name||!batch_id||!assessment_date){
            return res.status(404).json({error : "Please ensure that the user_id,assessment_name,batch_id and assessment_date is provided"});
        }
        else{
            const user = await Users.findOne( {where : {user_id : user_id}});
            const batch_found = await Batches.findOne({where : {batch_id : batch_id}});
            if(!user||!batch_found)
            {
                return res.status(404).json({ message : "No such user or no such batch is found"});
            }
            else
            {
                const role = await Roles.findOne({where : {role_id : user.role_id}});
                if(role && role?.role_name === "Learning And Development")
                {
                    const assessment_batch_found = await Assessment.findOne({where: {assessment_name : assessment_name,batch_id : batch_found.batch_id}});
                    if(assessment_batch_found){
                        return res.status(422).json({error : "Same assessment cannot be assigned to the same batch twice"});
                        
                    }
                    else{
                        const uploadQuestions = await Upload('../../../TemporaryFileStorage/Assessment.xlsx');
                        const assessment = await newAssessment(req,res,assessment_name,assessment_date,user,batch_found,uploadQuestions);
                        return res.status(200).json({message: "assessment created successfully"});

                    }
                }
                else{
                    return res.status(404).json({error : "The user does not belong to Learning and Development"});
                }
        }
    }
}
    catch(error : any){
        console.log(error);
        return res.status(500).send(error);
    }
        };

export default createAssessment;