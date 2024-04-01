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
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../../models/users"));
const resetPassword = (email, newPassword, confirmPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Finding the user in the database based on the provided email
        const userFound = yield users_1.default.findOne({
            where: { email: email },
        });
        if (userFound) {
            if (newPassword === confirmPassword) {
                // Hash the new password before updating
                const hashedPassword = bcrypt_1.default.hashSync(newPassword, bcrypt_1.default.genSaltSync(10));
                // Update the user's password with the hashed password
                yield users_1.default.update({ password: hashedPassword }, {
                    where: { email: email },
                });
                return {
                    status: 200,
                    data: {
                        message: `Your password has been changed `,
                        user_id: `${userFound.user_id}`,
                        user_name: `${userFound.user_name}`,
                    },
                };
            }
            else {
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
    }
    catch (error) {
        console.error("Error updating password:", error);
        return {
            status: 500,
            data: null,
            error: { message: "Internal Server Error" },
        };
    }
});
exports.default = resetPassword;
