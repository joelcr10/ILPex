import {Router, Request, Response} from "express";
import getTraineeDetails from "../../services/TraineeServices/getTraineeDetailsServices";
import traineeScore from "../l_and_d/traineeScoreController";
import getTraineeCurrentDay from "../../services/TraineeServices/getTraineeCurrentday";

const getProfile=async(req:Request,res:Response):Promise<
Response<
  any,
  Record<string,| { message: string }> 
>>=>{
    try{
       
        const user_id :number=parseInt(req.params.user_id as string);

        if(!user_id){
            return res.status(400).json({message:'user_id not valid'})
        }

        const data=await getTraineeDetails(user_id);


        if(data==null){
            return res.status(404).json({message:'No User Found'})
        }

        return res.status(200).json({data});
    }
    catch(err){         
            return res.status(500).json({message:err})
    }

}



export default getProfile;
