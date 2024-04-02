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
exports.sendWelcomeEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const users_1 = __importDefault(require("../../models/users"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendWelcomeEmail = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: true,
        auth: {
            user: process.env.NOTIFICATION_EMAIL,
            pass: process.env.NOTIFICATION_PASS,
        },
    });
    const userFound = yield users_1.default.findOne({
        where: { email: email },
    });
    if (userFound) {
        const sendMail = (transporter, email) => __awaiter(void 0, void 0, void 0, function* () {
            const info = yield transporter.sendMail({
                from: `"ILPex" <${process.env.NOTIFICATION_EMAIL}>`,
                to: email,
                subject: "Welcome to ILPex Team",
                html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to ILPex!</title>
          </head>
          <body style="font-family: Arial, sans-serif;">

              <h2 style="color: #8518FF;">Welcome to ILPex!</h2>
              
              <p>Dear ${userFound.user_name},</p>

              <p>We are thrilled to welcome you to the ILPex community! Thank you for choosing us as your platform of choice.</p>

              <p>As you embark on your journey with us, we want to ensure you have a seamless experience. Below are your account details:</p>

              <ul>
                  <li><strong>Email:</strong> ${userFound.email}</li>
                  <li><strong>Password:</strong> ${password}</li>
              </ul>

              <p>Please keep this information safe and secure.</p>

              <p>If you have any questions, concerns, or feedback, feel free to reach out to our support team. We're here to help!</p>

              <p>Once again, welcome aboard!</p>

              <p>Best regards,<br>
              The ILPex Team</p>

          </body>
          </html>
        `,
            });
            return info;
        });
        try {
            const result = yield sendMail(transporter, email);
            console.log("Welcome email sent:", result);
            return true;
        }
        catch (error) {
            console.error("Error sending welcome mail:", error);
            return false;
        }
    }
    else {
        console.error("User not found for email:", email);
        return false;
    }
});
exports.sendWelcomeEmail = sendWelcomeEmail;
