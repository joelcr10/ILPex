import {Request, Response} from 'express';
import sendMail from '../../services/l_and_d_Services/sendMail';
import { send } from 'process';

const sendMailController = async (req: Request, res: Response) => {
    const { day_number, IncompleteTraineeList } = req.body;

    console.log("Inside send mail", IncompleteTraineeList);

    if (!IncompleteTraineeList) {
        return res.status(400).json({ message: "Incomplete trainee list missing" });
    }

    if (!day_number) {
        return res.status(400).json({ message: "Day number is missing" });
    }

    if (IncompleteTraineeList.length === 0) {
        return res.status(400).json({ message: "Trainee list is empty" });
    }

    try {
        console.log("Sending mails...");
        for (const item of IncompleteTraineeList) {
            await sendMail(item.email, item.user_name, day_number);
        }
        console.log("All mails sent successfully");
        return res.status(200).json({ message: "Successfully sent mail" });
    } catch (error) {
        console.error("Error sending mails:", error);
        return res.status(500).json({ error: "Failed to send mail" });
    }
};



export default sendMailController;