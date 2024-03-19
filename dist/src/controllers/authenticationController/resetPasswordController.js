"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resetPasswordService_1 = tslib_1.__importDefault(require("../../services/authentication/resetPasswordService"));
// Controller function for handling login requests
const resetPasswordController = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !confirmPassword || !newPassword) {
        return res.status(401).json({ error: "All fields are required" });
    }
    try {
        const response = yield (0, resetPasswordService_1.default)(email, confirmPassword, newPassword);
        if (response.data) {
            return res.status(response.status).json(response.data);
        }
        else if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }
        else {
            return res.status(500).json({ error: "Internal Server Error " });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = resetPasswordController;
