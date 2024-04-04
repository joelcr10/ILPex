"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../../models/users"));
const roles_1 = __importDefault(require("../../models/roles"));
// Function for handling user registration
const userRegistration = (requestData) => __awaiter(void 0, void 0, void 0, function* () {
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
        const role_name = yield roles_1.default.findOne({
            where: { role_id: 101 },
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
        if (role_id === 101) {
            // Checking if the user with the same email already exists
            const existingUser = yield users_1.default.findOne({ where: { email: email } });
            if (existingUser) {
                return {
                    status: 400,
                    error: { message: "This user already exists" }
                };
            }
            else {
                // Creating a new user if all conditions are met
                const newUser = yield users_1.default.create({
                    email: email,
                    user_name: user_name,
                    password: password,
                    role_id: role_id,
                });
                // sendWelcomeEmail(email,password);
                return {
                    status: 200,
                    data: {
                        message: `new LandD user created. `,
                        user_id: `${newUser.user_id}`
                    }
                };
            }
        }
        else {
            // Handling invalid role ID
            return {
                status: 400,
                error: { message: "Invalid Role ID" }
            };
        }
    }
    catch (error) {
        // Handling any unexpected errors
        console.log("error caught :", error);
        return {
            status: 500,
            error: { message: "Internal Server Error" }
        };
    }
});
// Exporting the userRegistration function
exports.default = userRegistration;
