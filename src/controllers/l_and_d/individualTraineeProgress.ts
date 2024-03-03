import { Request,Response } from "express";
import individualTraineeProgressService from "../../services/l_and_d_Services/individualTraineeProgress";

const getIndividualTraineeProgress=async(req:Request,res:Response)=>{
    try{
        const trainee_id :number=parseInt(req.params.trainee_id as string);

        if(!trainee_id){
            return res.status(400).json({message:"Please ensure that the trainee_id is provided"});
        } 
        const individualTraineeProgress = individualTraineeProgressService(trainee_id);
        if(!individualTraineeProgress){
            return res.status(400).json({error : "invalid trainee_id"});
        }
        else{
            const highScore = individualTraineeProgress
        }
    }
    catch(err){
        
    }
}