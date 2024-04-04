import express, { Request, Response } from 'express';
import findUserId from '../../services/adminServices/findUserId';
import findTrainee from '../../services/adminServices/findTrainee';
import updateTrainee from '../../services/adminServices/updateTrainee';
import updateTraineeName from '../../services/adminServices/updateTraineName';
import updateTraineeEmail from '../../services/adminServices/updateTraineeEmail';
import updatePercipioMail from '../../services/adminServices/updatePercipioMailService';

const app = express();
app.use(express.json());

const updateTrainees = async (req: Request, res: Response) => {
    try {
        console.log('Entered manageUsers');
        const { user_id, status, user_name, email, percipio_email } = req.body;
        
        console.log(user_id, status, user_name, email, percipio_email);
        console.log("Hi-----");
        // Check if user_id and status are provided
        if (!user_id || status === undefined) {
            return res.status(400).json({ message: 'Both user_id and status are required' });
        }
        console.log("Hi-----");

        // If status is null, update with the fields from req.body
        if (status === null) {
            const user = await findUserId(user_id);
            if (!user) {
                return res.status(404).json({ message: 'No User Found' });
            }

            if (user.role_id !== 103) {
                return res.status(404).json({ message: 'This user is not a trainee' });
            }

            if (user_name && user) {
                await updateTraineeName(user, user_name);
            }
            if (email && user) {
                await updateTraineeEmail(user, email);
            }
            if (percipio_email && user) {
                await updatePercipioMail(user, percipio_email);
            }

            return res.status(200).json({ message: 'Trainee fields updated successfully' });
        }

        console.log("Hi-----");
        // If status is provided, update trainee status
        if (status === 0 || status === 1) {
            const trainee = await findTrainee(user_id);
            if (!trainee) {
                return res.status(404).json({ message: 'No Trainee Found' });
            }

            await updateTrainee(trainee, status);
            return res.status(200).json({ message: `Trainee status changed to ${status}` });
        }

        return res.status(400).json({ message: 'Invalid status value' });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default updateTrainees;
