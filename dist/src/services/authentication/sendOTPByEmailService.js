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
exports.sendOTPByEmail = exports.otpStorage = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const users_1 = __importDefault(require("../../models/users"));
exports.otpStorage = {};
const generateOTP = () => (1000 + Math.floor(Math.random() * 9000)).toString();
const sendOTPByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "joelcrajudeveloper@gmail.com",
            pass: "xkrv ohcg pxjj sxah",
        },
    });
    const userFound = yield users_1.default.findOne({
        where: { email: email },
    });
    if (userFound) {
        const otp = generateOTP();
        const testMail = (transporter, email) => __awaiter(void 0, void 0, void 0, function* () {
            const info = yield transporter.sendMail({
                from: '"ILPex" <joelcrajudeveloper@gmail.com>',
                to: email,
                subject: "Verification Code",
                html: `
        <b>Hello ${userFound.user_name},</b>
        <br>
        <p>Thank you for using ILPex. Your verification code is:</p>
        <h2>${otp}</h2>
        <p>Please use this code to complete the verification process.</p>
        <br>
        <p>If you didn't request this code, please ignore this email.</p>
        <br>
        <p>Best regards,</p>
        <p>The ILPex Team</p>
        `,
            });
            return info;
        });
        try {
            const test = yield testMail(transporter, email);
            exports.otpStorage[email] = otp;
            return true;
        }
        catch (error) {
            console.error("Error sending OTP:", error);
            return false;
        }
    }
    else {
        return false;
    }
});
exports.sendOTPByEmail = sendOTPByEmail;
