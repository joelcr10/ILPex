import { Request, Response } from "express";
import userLogin from "../../services/adminservices/userLoginService";

const loginController = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  const { email, password } = req.body;

  try {
    const response = await userLogin(email, password);
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

export default loginController;

