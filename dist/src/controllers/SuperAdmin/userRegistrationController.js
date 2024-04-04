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
const userRegistrationService_1 = __importDefault(require("../../services/adminServices/userRegistrationService"));
// Controller function for handling user registration requests
const userRegistrationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, user_name, password, role_id, jwt_decoded } = req.body;
        console.log("----------------------------------------------------------------", email, user_name, password, role_id, jwt_decoded);
        if (!email || !user_name || !password || !role_id || !jwt_decoded) {
            return res.status(401).json({ error: "All fields are required" });
        }
        // Calling the userRegistration service to handle user registration logic
        const response = yield (0, userRegistrationService_1.default)({
            email,
            user_name,
            password,
            role_id,
            jwt_decoded,
        });
        if (response.data) {
            return res.status(response.status).json(response.data);
        }
        else if (response.error) {
            return res.status(response.status).json({ error: response.error.message });
        }
        else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = userRegistrationController;
