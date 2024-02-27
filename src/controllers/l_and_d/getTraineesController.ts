
import {Router, Request, Response} from "express";
import getAllTraineesServices from "../../services/l_and_d_Services/getAllTraineesServices";

const getTrainees=async(req:Request,res:Response):Promise<
Response<
  any,
  Record<string,| { message: string }> 
>>=>{
    try{
        //query parameters
        const offset: number = parseInt(req.query.offset as string) || 0;
        const sortKey: string = req.query.sortKey as string||"trainee_id";
        const sortOrder: string = req.query.sortOrder as string === '-1' ? 'DESC' : 'ASC';


        if(sortKey!=='trainee_id'&&sortKey!=='user_id'&&sortKey!=='batch_id'){
            return res.status(400).json({message:"Invalid SortKey"})
          }

        //Call the service function to get trainee data
        const trainees= await getAllTraineesServices(offset,sortKey,sortOrder);
          

        if(trainees==null){
            return res.json({message:"No Results Found"});
        }

        return res.status(200).json(trainees);
    }
    catch(err){
            return res.status(500).json({message:err})
    }

}



export default getTrainees;
