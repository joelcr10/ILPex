//created by Joel
import createDays from "../../services/adminServices/createDays";
import {Request, Response} from 'express';


//controller to add day_id and day to Day table in bulk;
const createDaysController = async (req: Request, res: Response) =>{
    await createDays(req,res);
}

export default createDaysController;