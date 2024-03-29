import { Request, Response } from "express";
import userLogin from "../../services/authentication/userLoginService";

const loginController = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: "All fields are required" });
  }
  try {
    const response = await userLogin(email, password);//call user login service
    if (response.data) {
      return res.status(response.status).json(response.data);
    } else if (response.error) {
      return res.status(response.status).json({ error: response.error });
    } else {
      return res.status(500).json({ error: `Internal Server Error ` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ` Invalid Credentials` });
  }
};

export default loginController;
