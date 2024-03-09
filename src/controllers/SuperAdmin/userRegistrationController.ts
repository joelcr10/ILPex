import { Request, Response } from "express";
import userRegistration from "../../services/adminservices/userRegistrationService";

// Controller function for handling user registration requests
const userRegistrationController = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  try {
    const { email, user_name, password, role_id, jwt_decoded } = req.body;

    if (!email || !user_name || !password || !role_id || !jwt_decoded) {
      return res.status(401).json({ error: "All fields are required" });
    }

    // Calling the userRegistration service to handle user registration logic
    const response = await userRegistration({
      email,
      user_name,
      password,
      role_id,
      jwt_decoded,
    });

    if (response.data) {

      return res.status(response.status).json(response.data);
    } else if (response.error) {

      return res.status(response.status).json({ error: response.error.message });
    } else {

      return res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {

    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default userRegistrationController;
