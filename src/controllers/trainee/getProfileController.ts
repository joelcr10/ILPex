import {Router, Request, Response} from "express";
import getTraineeDetails from "../../services/TraineeServices/getTraineeDetailsServices";

const getProfile=async(req:Request,res:Response):Promise<
Response<
  any,
  Record<string,| { message: string }> 
>>=>{
    try{
       
        const trainee_id :number=parseInt(req.params.trainee_id as string);

        if(!trainee_id){
            return res.status(400).json({message:'trainee_id not defined'})
        }

        const profileDetails=await getTraineeDetails(trainee_id);

        if(!(profileDetails?.isActive)){
            return res.status(403).json({message:'Trainee is Inactive'})
        }

        if(profileDetails==null){
            return res.status(404).json({message:'No Trainee Found'})
        }

        return res.status(200).json({profileDetails});
    }
    catch(err){
            return res.status(500).json({message:err})
    }

}



export default getProfile;
