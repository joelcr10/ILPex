import { Request, Response } from "express";
import { sendWelcomeEmail } from "../../services/adminServices/welcomeAdminService";

const sendWelcomeEmailController = async (req: Request, res: Response) => {
  const { email,jwt_decoded } = req.body;
  try {
    if(!email){
      return res.status(500).json({error: "All fields are required"});
    }
    if(!jwt_decoded){
        return res.status(500).json({error: "Token are required"});
      }
    const isSent = await sendWelcomeEmail(email,"password");
    if (isSent) {
     return res.status(200).json({message: "Email sent successfully!"});
    } else {
     return res.status(500).json({error: "Failed to send Email. Check if email is valid"});
    }
  } catch (error) {
    return res.status(500).json({error:`Internal server error ${error}`});
  }
};

export default sendWelcomeEmailController;


