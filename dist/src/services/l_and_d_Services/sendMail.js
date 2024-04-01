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
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const testMail = (transporter, receiverMail, username, day_number) => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield transporter.sendMail({
        from: `"ILPex" <${process.env.NOTIFICATION_EMAIL}>`,
        to: receiverMail,
        subject: "Incomplete Day Notification",
        // text: "", // plain text body
        html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <p>Hello <b>${username}</b>,</p>
                <p>We noticed that you haven't completed the <b>Day ${day_number} track</b> in Percipio.</p>
                <p>Please log in to your Percipio account and complete the remaining courses for the day.</p>
                <p>Thank you for using ILPex for your e-learning journey!</p>
                <br>
                <br>
                <p>Best Regards, </p>
                <p>The ILPex Team</p>
            </div>              
              `, // html body
    });
    return info;
});
const sendMail = (receiverMail, username, day_number) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("-----------------------------------------", process.env.NOTIFICATION_EMAIL);
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NOTIFICATION_EMAIL,
            pass: process.env.NOTIFICATION_PASS, //app password in 2 step authenticaion
        },
    });
    const test = yield testMail(transporter, receiverMail, username, day_number);
    return "success";
});
exports.default = sendMail;
