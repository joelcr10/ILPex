"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const welcomeAdminService_1 = require("../../services/adminServices/welcomeAdminService");
const sendWelcomeEmailController = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
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
