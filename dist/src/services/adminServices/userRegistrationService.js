"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const users_1 = tslib_1.__importDefault(require("../../models/users"));
const roles_1 = tslib_1.__importDefault(require("../../models/roles"));
const welcomeAdminService_1 = require("./welcomeAdminService");
// Function for handling user registration
const userRegistration = (requestData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
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
                (0, welcomeAdminService_1.sendWelcomeEmail)(email, password);
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
