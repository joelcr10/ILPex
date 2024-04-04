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
Object.defineProperty(exports, "__esModule", { value: true });
const welcomeAdminService_1 = require("../../services/adminServices/welcomeAdminService");
const sendWelcomeEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, jwt_decoded } = req.body;
    try {
        if (!email) {
            return res.status(500).json({ error: "All fields are required" });
        }
        if (!jwt_decoded) {
            return res.status(500).json({ error: "Token are required" });
        }
        const isSent = yield (0, welcomeAdminService_1.sendWelcomeEmail)(email, "password");
        if (isSent) {
            return res.status(200).json({ message: "Email sent successfully!" });
        }
        else {
            return res.status(500).json({ error: "Failed to send Email. Check if email is valid" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: `Internal server error ${error}` });
    }
});
exports.default = sendWelcomeEmailController;
