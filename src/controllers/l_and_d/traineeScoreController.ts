import {Router, Request, Response} from "express";
import getTraineeScoresServices from "../../services/l_and_d_Services/getTraineeScoresServices";

const traineeScore=async(req:Request,res:Response):Promise<
Response<
  any,
  Record<string,| { message: string }> 
>>=>{
    try{
       
        const trainee_id :number=parseInt(req.params.trainee_id as string);

        if(!trainee_id){
            return res.status(400).json({message:'trainee_id not defined'})
        }

        const scoreDetails=await getTraineeScoresServices(trainee_id);

        if(scoreDetails==null){
            return res.status(404).json({message:'No scores found for the specified trainee'});
        }

        return res.status(200).json({scoreDetails});
    }
    catch(err){
            return res.status(500).json({message:err})
    }

}



export default traineeScore;
