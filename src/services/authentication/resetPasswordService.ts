import Users from "../../models/users";

interface SuccessResponse {
  message: string;
  user_id: string;
  user_name:string;
}


// Defining the shape of an error response
interface ErrorResponse {
  message: string;
}

// Defining the shape of the overall response
interface ResetPasswordResponse {
  status: number;
  data?: SuccessResponse 
  error?: ErrorResponse;
}

const resetPassword = async (
  email: string,
  newPassword: string,
  confirmPassword:string
): Promise<ResetPasswordResponse> => {

  // Finding the user in the database based on the provided email
  const userFound = await Users.findOne({
    where: { email: email },
  });


  if (userFound) {
    if (newPassword==confirmPassword) {

        await Users.update(
            { password: newPassword },
            {
              where: { email: email },
            }
          );
        
        return {
            status: 200,
            data: {
              message: `Your has been changed `,
              user_id: `${userFound.user_id}`,
              user_name:`${userFound.user_name}`
            }
          };
    }else {
        return {
            status: 401,
            error: { message: "Passwords should match" },
          };
    }  
  }

  return {
    status: 404,
    error: { message: "No such usertype found" },
  };
};

export default resetPassword;
