import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../../models/users";
import dotenv from "dotenv";

dotenv.config();

const { JWTTOKENCODE } = process.env as { JWTTOKENCODE: string | undefined };

interface SuccessResponse {
  message: string;
  token: string;
  user_id: string;
}

interface ErrorResponse {
  message: string;
}

interface LoginResponse {
  status: number;
  data?: SuccessResponse;
  error?: ErrorResponse;
}

const userLogin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const userFound = await Users.findOne({
    where: { email: email },
  });

  if (userFound) {
    if (userFound?.role_id == 101) {
      if (userFound && bcrypt.compareSync(password, userFound.password)) {
        if (JWTTOKENCODE && userFound?.user_id && userFound?.role_id) {
          const token = jwt.sign(
            { user_reg_id: userFound?.user_id, usertype: userFound?.role_id },
            JWTTOKENCODE,
            { expiresIn: "24h" }
          );
          return {
            status: 200,
            data: {
              message: `SuperAdmin logged in!`,
              token: ` ${token}`,
              user_id: `${userFound.user_id}`,
            },
          };
        } else {
          console.error(
            "Unable to sign the token. Check if JWTTOKENCODE and userFound are defined."
          );
          return {
            status: 500,
            error: { message: "Internal Server Error:- Unable to sign the token. Check if JWTTOKENCODE and userFound are defined. " },
          };
        }
      } else {
        return {
          status: 401,
          error: { message: "Incorrect password" },
        };
      }
    }

    if (userFound?.role_id == 102) {
      if (userFound && bcrypt.compareSync(password, userFound.password)) {
        if (JWTTOKENCODE && userFound?.user_id && userFound?.role_id) {
          const token = jwt.sign(
            { user_reg_id: userFound?.user_id, usertype: userFound?.role_id },
            JWTTOKENCODE,
            { expiresIn: "24h" }
          );
          return {
            status: 200,
            data: {
              message: `Learning and Development member logged in!`,
              token: ` ${token}`,
              user_id: `${userFound.user_id}`,
            },
          };
        } else {
          console.error(
            "Unable to sign the token. Check if JWTTOKENCODE and userFound are defined."
          );
          return {
            status: 500,
            error: { message: "Internal Server Error:- Unable to sign the token. Check if JWTTOKENCODE and userFound are defined. " },
          };
        }
      } else {
        return {
          status: 401,
          error: { message: "Incorrect password" },
        };
      }
    }

    if (userFound?.role_id == 103) {
      if (userFound && bcrypt.compareSync(password, userFound.password)) {
        if (JWTTOKENCODE && userFound?.user_id && userFound?.role_id) {
          const token = jwt.sign(
            { user_reg_id: userFound?.user_id, usertype: userFound?.role_id },
            JWTTOKENCODE,
            { expiresIn: "24h" }
          );
          return {
            status: 200,
            data: {
              message: `Trainee logged in!`,
              token: ` ${token}`,
              user_id: `${userFound.user_id}`,
            },
          };
        } else {
          console.error(
            "Unable to sign the token. Check if JWTTOKENCODE and userFound are defined."
          );
          return {
            status: 500,
            error: { message: "Internal Server Error:- Unable to sign the token. Check if JWTTOKENCODE and userFound are defined. " },
          };
        }
      } else {
        return {
          status: 401,
          error: { message: "Incorrect password" },
        };
      }
    }
  }

  return {
    status: 404,
    error: { message: "No such usertype found" },
  };
};

export default userLogin;
