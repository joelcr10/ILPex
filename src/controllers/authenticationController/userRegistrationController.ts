// Importing necessary modules
import { Request, Response } from "express";
import userRegistration from "../../services/adminservices/userRegistrationService";

// Controller function for handling user registration requests
const userRegistrationController = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  try {
    // Destructuring relevant data from the request body
    const { email, user_name, password, role_id, jwt_decoded } = req.body;

    // Checking if required fields are missing
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

    // Checking the response from userRegistration service and sending appropriate response
    if (response.data) {
      // If successful, return status and data
      return res.status(response.status).json(response.data);
    } else if (response.error) {
      // If there is an error, return status and error message
      return res.status(response.status).json({ error: response.error.message });
    } else {
      // Handling unexpected internal server error
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    // Handling any unexpected errors and logging to console
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Exporting the userRegistrationController function
export default userRegistrationController;
