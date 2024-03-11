import bcrypt from 'bcrypt';
import Users from "../../models/users";

interface SuccessResponse {
  message: string;
  user_id: string;
  user_name: string;
}

// Defining the shape of an error response
interface ErrorResponse {
  message: string;
}

// Defining the shape of the overall response
interface ResetPasswordResponse {
  status: number;
  data?: SuccessResponse | null;
  error?: ErrorResponse | null;
}

const resetPassword = async (
  email: string,
  newPassword: string,
  confirmPassword: string
): Promise<ResetPasswordResponse> => {
  try {
    // Finding the user in the database based on the provided email
    const userFound = await Users.findOne({
      where: { email: email },
    });

    if (userFound) {
      if (newPassword === confirmPassword) {
        // Hash the new password before updating
        const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));

        // Update the user's password with the hashed password
        await Users.update(
          { password: hashedPassword },
          {
            where: { email: email },
          }
        );

        return {
          status: 200,
          data: {
            message: `Your password has been changed `,
            user_id: `${userFound.user_id}`,
            user_name: `${userFound.user_name}`,
          },
        };
      } else {
        return {
          status: 401,
          data: null,
          error: { message: "Passwords should match" },
        };
      }
    }

    return {
      status: 404,
      data: null,
      error: { message: "No such user found" },
    };
  } catch (error) {
    console.error("Error updating password:", error);
    return {
      status: 500,
      data: null,
      error: { message: "Internal Server Error" },
    };
  }
};

export default resetPassword;
