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
// Importing necessary modules
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../../models/users"));
const dotenv_1 = __importDefault(require("dotenv"));
const trainees_1 = __importDefault(require("../../models/trainees"));
// Loading environment variables
dotenv_1.default.config();
// Extracting JWTTOKENCODE from environment variables
const { JWTTOKENCODE } = process.env;
// Function for handling user login
const userLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Finding the user in the database based on the provided email
    const userFound = yield users_1.default.findOne({
        where: { email: email },
    });
    const traineeFound = yield trainees_1.default.findOne({
        where: { user_id: userFound === null || userFound === void 0 ? void 0 : userFound.user_id }
    });
    // Handling different user roles
    if (userFound) {
        // SuperAdmin role (role_id: 101)
        if ((userFound === null || userFound === void 0 ? void 0 : userFound.role_id) == 101) {
            // Checking password validity
            if (userFound && bcrypt_1.default.compareSync(password, userFound.password)) {
                // Creating a JWT token for SuperAdmin
                if (JWTTOKENCODE && (userFound === null || userFound === void 0 ? void 0 : userFound.user_id) && (userFound === null || userFound === void 0 ? void 0 : userFound.role_id)) {
                    const token = jsonwebtoken_1.default.sign({ user_reg_id: userFound === null || userFound === void 0 ? void 0 : userFound.user_id, usertype: userFound === null || userFound === void 0 ? void 0 : userFound.role_id }, JWTTOKENCODE, { expiresIn: "60d" });
                    return {
                        status: 200,
                        data: {
                            message: `SuperAdmin logged in!`,
                            token: `${token}`,
                            user_id: `${userFound.user_id}`,
                            role_id: `${userFound.role_id}`,
                            user_name: `${userFound.user_name}`,
                        },
                    };
                }
                else {
                    // Handling error if unable to sign the JWT token
                    console.error("Unable to sign the token. Check if JWTTOKENCODE and userFound are defined.");
                    return {
                        status: 500,
                        error: { message: "Internal Server Error:- Unable to sign the token. Check if JWTTOKENCODE and userFound are defined. " },
                    };
                }
            }
            else {
                // Incorrect password for SuperAdmin
                return {
                    status: 401,
                    error: { message: "Incorrect password" },
                };
            }
        }
        // Learning and Development member role (role_id: 102)
        if ((userFound === null || userFound === void 0 ? void 0 : userFound.role_id) == 102) {
            // Checking password validity
            if (userFound && bcrypt_1.default.compareSync(password, userFound.password)) {
                // Creating a JWT token for Learning and Development member
                if (JWTTOKENCODE && (userFound === null || userFound === void 0 ? void 0 : userFound.user_id) && (userFound === null || userFound === void 0 ? void 0 : userFound.role_id)) {
                    const token = jsonwebtoken_1.default.sign({ user_reg_id: userFound === null || userFound === void 0 ? void 0 : userFound.user_id, usertype: userFound === null || userFound === void 0 ? void 0 : userFound.role_id }, JWTTOKENCODE, { expiresIn: "60d" });
                    return {
                        status: 200,
                        data: {
                            message: `Learning and Development member logged in!`,
                            token: `${token}`,
                            user_id: `${userFound.user_id}`,
                            role_id: `${userFound.role_id}`,
                            user_name: `${userFound.user_name}`,
                        },
                    };
                }
                else {
                    // Handling error if unable to sign the JWT token
                    console.error("Unable to sign the token. Check if JWTTOKENCODE and userFound are defined.");
                    return {
                        status: 500,
                        error: { message: "Internal Server Error:- Unable to sign the token. Check if JWTTOKENCODE and userFound are defined. " },
                    };
                }
            }
            else {
                // Incorrect password for Learning and Development member
                return {
                    status: 401,
                    error: { message: "Incorrect password" },
                };
            }
        }
        // Trainee role (role_id: 103)
        if ((userFound === null || userFound === void 0 ? void 0 : userFound.role_id) == 103 && (traineeFound === null || traineeFound === void 0 ? void 0 : traineeFound.isActive) == true) {
            // Checking password validity
            if (userFound && bcrypt_1.default.compareSync(password, userFound.password)) {
                // Creating a JWT token for Trainee
                if (JWTTOKENCODE && (userFound === null || userFound === void 0 ? void 0 : userFound.user_id) && (userFound === null || userFound === void 0 ? void 0 : userFound.role_id)) {
                    const token = jsonwebtoken_1.default.sign({ user_reg_id: userFound === null || userFound === void 0 ? void 0 : userFound.user_id, usertype: userFound === null || userFound === void 0 ? void 0 : userFound.role_id }, JWTTOKENCODE, { expiresIn: "60d" });
                    return {
                        status: 200,
                        data: {
                            message: `Trainee logged in!`,
                            token: `${token}`,
                            user_id: `${userFound.user_id}`,
                            role_id: `${userFound.role_id}`,
                            trainee_id: `${traineeFound === null || traineeFound === void 0 ? void 0 : traineeFound.trainee_id}`,
                            user_name: `${userFound.user_name}`,
                        },
                    };
                }
                else {
                    // Handling error if unable to sign the JWT token
                    console.error("Unable to sign the token. Check if JWTTOKENCODE and userFound are defined.");
                    return {
                        status: 500,
                        error: { message: "Internal Server Error:- Unable to sign the token. Check if JWTTOKENCODE and userFound are defined. " },
                    };
                }
            }
            else {
                // Incorrect password for Trainee
                return {
                    status: 401,
                    error: { message: "Incorrect password" },
                };
            }
        }
    }
    else {
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
});
// Exporting the userLogin function
exports.default = userLogin;
