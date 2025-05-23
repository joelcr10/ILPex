import {Request, Response} from 'express';
import findTraineeNamesOfABatchByBatchIdServices from '../../services/l_and_d_Services/findTraineeNamesOfABatchByBatchIdServices';
import sendAssessmentMail from '../../services/l_and_d_Services/sendAssessmentMail';
import { start } from 'repl';

const sendAssessmentMailController = async (req: Request, res: Response) => {
    const { batch_id, assessment_name, start_date, end_date } = req.body;
    console.log("Received Data: ", batch_id, assessment_name, start_date, end_date);
    
    if (!batch_id || !assessment_name || !start_date || !end_date) {
        return res.status(400).json({ error: 'Missing Fields in the request' });
    }

    try {
        const traineesList = await findTraineeNamesOfABatchByBatchIdServices(batch_id);
        console.log("INSIDE ASSESSMENT MAILLL----------------");
        
        for (const traineeObject of traineesList) {
            await sendAssessmentMail(traineeObject.email, traineeObject.user_name, assessment_name, start_date, end_date);
        }

        console.log("COMPLETED MAILLL------------");
        return res.status(200).json({ message: "Successfully sent mail" });
    } catch (error) {
        console.error("Error sending assessment mails:", error);
        return res.status(500).json({ error: "Failed to send mail" });
    }
};


export default sendAssessmentMailController;
