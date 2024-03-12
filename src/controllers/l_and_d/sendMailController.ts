import {Request, Response} from 'express';
import sendMail from '../../services/l_and_d_Services/sendMail';
import { send } from 'process';

const sendMailController = (req: Request, res: Response) =>{
    const {day_number, IncompleteTraineeList} = req.body;


    console.log("inside send mail",IncompleteTraineeList);

    if(!IncompleteTraineeList){
        return res.status(400).json({message: "Incomplete trainee list missing"});
    }

    if(!day_number){
        return res.status(400).json({message: "Day number is missing"});
    }

    if(IncompleteTraineeList.length==0){
        return res.status(400).json({message: "Trainee list is empty"});
    }

    // console.log(user_id, IncompleteTraineeList);


    IncompleteTraineeList.map(async (item: any)=>{
       await sendMail(item.email,item.user_name,day_number);
    })

    // sendMail();


    return res.status(200).json({message: "Successfully sent mail"});
}


export default sendMailController;