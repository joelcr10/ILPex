import Users from "../../models/users";
import Roles from "../../models/roles";

interface RegistrationRequest {
  email: string;
  user_name: string;
  password: string;
  role_id: number;
  jwt_decoded: {
    usertype: number;
  };
}

interface RegistrationResponse {
  status: number;
  data?: {
    message: string;
  };
  error?: {
    message: string;
  };
}

const userRegistration = async (requestData: RegistrationRequest): Promise<RegistrationResponse> => {
  try {
    const { email, user_name, password, role_id, jwt_decoded } = requestData;
    if (!email || !user_name || !password || !role_id) {
      return {
        status: 500,
        error: { message: "Internal server error:- All fields are required" }
      };
    }

    console.log(jwt_decoded.usertype);

    const role_name = await Roles.findOne({
      where: { role_id: jwt_decoded.usertype },
    });

    if (!role_name || role_name.role_id !== 101) {
      return {
        status: 401,
        error: { message: "Only admin can create users" }
      };
    }

    if (role_id === 103) {
      return {
        status: 400,
        error: { message: "Trainee can be created only after batch creation" }
      };
    }
    if (role_id === 102) {
    const existingUser = await Users.findOne({ where: { email: email } });
    if (existingUser) {
      return {
        status: 400,
        error: { message: "This user already exists" }
      };
    } else {
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
    }
    else {
      return {
        status: 400,
        error: { message: "Invalid Role ID" }
      };
    }
  } catch (error) {
    console.log("error caught :", error);
    return {
      status: 500,
      error: { message: "Internal Server Error" }
    };
  }
};

export default userRegistration;

