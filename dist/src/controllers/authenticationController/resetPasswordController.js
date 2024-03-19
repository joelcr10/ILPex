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
const resetPasswordService_1 = __importDefault(require("../../services/authentication/resetPasswordService"));
// Controller function for handling login requests
const resetPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
