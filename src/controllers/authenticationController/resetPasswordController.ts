// Importing necessary modules
import { Request, Response } from "express";
import resetPassword from "../../services/authentication/resetPasswordService";

// Controller function for handling login requests
const resetPasswordController = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {

    const { email,  newPassword, confirmPassword} = req.body;

  if (!email || !confirmPassword ||!newPassword) {
    return res.status(401).json({ error: "All fields are required" });
  }

  try {

    const response = await resetPassword(email, confirmPassword,newPassword);

    if (response.data) {

        return res.status(response.status).json(response.data);
    } else if (response.error) {
        
      return res.status(response.status).json({ error: response.error });

    } else {

      return res.status(500).json({ error: "Internal Server Error " });
    }
  } catch (error) {

    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });

  }
};

export default resetPasswordController;
