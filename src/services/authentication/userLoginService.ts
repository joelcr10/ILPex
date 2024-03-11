// Importing necessary modules
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../../models/users";
import dotenv from "dotenv";
import Trainees from "../../models/trainees";

// Loading environment variables
dotenv.config();

// Extracting JWTTOKENCODE from environment variables
const { JWTTOKENCODE } = process.env as { JWTTOKENCODE: string | undefined };

// Defining the shape of a successful response
interface SuccessResponse {
  message: string;
  token: string;
  user_id: string;
  role_id:string;
  trainee_id:string;
}
interface SuccessAdminResponse {
  message: string;
  token: string;
  user_id: string;
  role_id:string;
 
}

// Defining the shape of an error response
interface ErrorResponse {
  message: string;
}

// Defining the shape of the overall login response
interface LoginResponse {
  status: number;
  data?: SuccessResponse | SuccessAdminResponse;
  error?: ErrorResponse;
}

// Function for handling user login
const userLogin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  // Finding the user in the database based on the provided email
  const userFound = await Users.findOne({
    where: { email: email },
  });


  const traineeFound = await Trainees.findOne({
    where: {user_id: userFound?.user_id}
  });

  // Handling different user roles
  if (userFound) {
    // SuperAdmin role (role_id: 101)
    if (userFound?.role_id == 101) {
      // Checking password validity
      if (userFound && bcrypt.compareSync(password, userFound.password)) {
        // Creating a JWT token for SuperAdmin
        if (JWTTOKENCODE && userFound?.user_id && userFound?.role_id) {
          const token = jwt.sign(
            { user_reg_id: userFound?.user_id, usertype: userFound?.role_id },
            JWTTOKENCODE,
            { expiresIn: "60d" }
          );
          return {
            status: 200,
            data: {
              message: `SuperAdmin logged in!`,
              token: `${token}`,
              user_id: `${userFound.user_id}`,
              role_id:`${userFound.role_id}`,
            },
          };
        } else {
          // Handling error if unable to sign the JWT token
          console.error(
            "Unable to sign the token. Check if JWTTOKENCODE and userFound are defined."
          );
          return {
            status: 500,
            error: { message: "Internal Server Error:- Unable to sign the token. Check if JWTTOKENCODE and userFound are defined. " },
          };
        }
      } else {
        // Incorrect password for SuperAdmin
        return {
          status: 401,
          error: { message: "Incorrect password" },
        };
      }
    }

    // Learning and Development member role (role_id: 102)
    if (userFound?.role_id == 102) {
      // Checking password validity
      if (userFound && bcrypt.compareSync(password, userFound.password)) {
        // Creating a JWT token for Learning and Development member
        if (JWTTOKENCODE && userFound?.user_id && userFound?.role_id) {
          const token = jwt.sign(
            { user_reg_id: userFound?.user_id, usertype: userFound?.role_id },
            JWTTOKENCODE,
            { expiresIn: "60d" }
          );
          return {
            status: 200,
            data: {
              message: `Learning and Development member logged in!`,
              token: `${token}`,
              user_id: `${userFound.user_id}`,
              role_id:`${userFound.role_id}`,

            },
          };
        } else {
          // Handling error if unable to sign the JWT token
          console.error(
            "Unable to sign the token. Check if JWTTOKENCODE and userFound are defined."
          );
          return {
            status: 500,
            error: { message: "Internal Server Error:- Unable to sign the token. Check if JWTTOKENCODE and userFound are defined. " },
          };
        }
      } else {
        // Incorrect password for Learning and Development member
        return {
          status: 401,
          error: { message: "Incorrect password" },
        };
      }
    }

    // Trainee role (role_id: 103)
    if (userFound?.role_id == 103 && traineeFound?.isActive==true) {
      // Checking password validity
      if (userFound && bcrypt.compareSync(password, userFound.password)) {
        // Creating a JWT token for Trainee
        if (JWTTOKENCODE && userFound?.user_id && userFound?.role_id) {
          const token = jwt.sign(
            { user_reg_id: userFound?.user_id, usertype: userFound?.role_id },
            JWTTOKENCODE,
            { expiresIn: "60d" }
          );
          return {
            status: 200,
            data: {
              message: `Trainee logged in!`,
              token: `${token}`,
              user_id: `${userFound.user_id}`,
              role_id:`${userFound.role_id}`,
              trainee_id:`${traineeFound?.trainee_id}`
            },
          };
        } else {
          // Handling error if unable to sign the JWT token
          console.error(
            "Unable to sign the token. Check if JWTTOKENCODE and userFound are defined."
          );
          return {
            status: 500,
            error: { message: "Internal Server Error:- Unable to sign the token. Check if JWTTOKENCODE and userFound are defined. " },
          };
        }
      } else {
        // Incorrect password for Trainee
        return {
          status: 401,
          error: { message: "Incorrect password" },
        };
      }
    }
  }
  else{
    // No matching user found
    return {
      status: 500,
      error: { message: "Invalid credentials" },
    };
  }
  return {
    status: 404,
    error: { message: "No such usertype found" },
  };

  
};

// Exporting the userLogin function
export default userLogin;
