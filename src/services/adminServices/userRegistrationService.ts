// Importing necessary models
import Users from "../../models/users";
import Roles from "../../models/roles";

// Defining the shape of the request data for user registration
interface RegistrationRequest {
  email: string;
  user_name: string;
  password: string;
  role_id: number;
  jwt_decoded: {
    usertype: number;
  };
}

// Defining the shape of the response for user registration
interface RegistrationResponse {
  status: number;
  data?: {
    message: string;
  };
  error?: {
    message: string;
  };
}

// Function for handling user registration
const userRegistration = async (requestData: RegistrationRequest): Promise<RegistrationResponse> => {
  try {
    // Destructuring the request data
    const { email, user_name, password, role_id, jwt_decoded } = requestData;

    // Checking if required fields are missing
    if (!email || !user_name || !password || !role_id) {
      return {
        status: 500,
        error: { message: "Internal server error:- All fields are required" }
      };
    }

    // Finding the role name based on the user type from JWT payload
    const role_name = await Roles.findOne({
      where: { role_id: jwt_decoded.usertype },
    });

    // Checking if the user has the admin role to create users
    if (!role_name || role_name.role_id !== 101) {
      return {
        status: 401,
        error: { message: "Only admin can create users" }
      };
    }

    // Checking specific conditions based on role ID
    if (role_id === 103) {
      return {
        status: 400,
        error: { message: "Trainee can be created only after batch creation" }
      };
    }
    
    if (role_id === 102) {
      // Checking if the user with the same email already exists
      const existingUser = await Users.findOne({ where: { email: email } });
      if (existingUser) {
        return {
          status: 400,
          error: { message: "This user already exists" }
        };
      } else {
        // Creating a new user if all conditions are met
        const newUser = await Users.create({
          email: email,
          user_name: user_name,
          password: password,
          role_id: role_id,
        });
        return {
          status: 200,
          data: {
            message: `new LandD user created. userid is ${newUser.user_id}.`,
          }
        };
      }
    } else {
      // Handling invalid role ID
      return {
        status: 400,
        error: { message: "Invalid Role ID" }
      };
    }
  } catch (error) {
    // Handling any unexpected errors
    console.log("error caught :", error);
    return {
      status: 500,
      error: { message: "Internal Server Error" }
    };
  }
};

// Exporting the userRegistration function
export default userRegistration;
