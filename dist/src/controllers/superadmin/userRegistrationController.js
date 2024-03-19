"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userRegistrationService_1 = tslib_1.__importDefault(require("../../services/adminservices/userRegistrationService"));
// Controller function for handling user registration requests
const userRegistrationController = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, user_name, password, role_id, jwt_decoded } = req.body;
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
