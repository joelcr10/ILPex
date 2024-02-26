// Importing necessary modules
import { Request, Response } from "express";
import userLogin from "../../services/adminservices/userLoginService";

// Controller function for handling login requests
const loginController = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  // Extracting email and password from the request body
  const { email, password } = req.body;

  // Checking if required fields are missing
  if (!email || !password) {
    return res.status(401).json({ error: "All fields are required" });
  }

  try {
    // Calling the userLogin service to handle user login logic
    const response = await userLogin(email, password);

    // Checking the response from userLogin service and sending appropriate response
    if (response.data) {
      // If successful, return status and data
      return res.status(response.status).json(response.data);
    } else if (response.error) {
      // If there is an error, return status and error message
      return res.status(response.status).json({ error: response.error });
    } else {
      // Handling unexpected internal server error
      return res.status(500).json({ error: "Internal Server Error " });
    }
  } catch (error) {
    // Handling any unexpected errors and logging to console
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Exporting the loginController function
export default loginController;
