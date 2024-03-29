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
const testMail = (transporter, receiverMail, username, asessment_name, start_date, end_date) => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield transporter.sendMail({
        from: '"ILPex" <joelcrajudeveloper@gmail.com>', // sender address
        to: receiverMail, // list of receivers
        subject: `New Assessment - ${asessment_name}`, // Subject line
        // text: "", // plain text body
        html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <p>Hello <b>${username}</b>,</p>
                <p>We would like to inform you that a new assessment titled ${asessment_name} has been assigned to you. This assignment is designed to further enhance your skills and knowledge in the specific domain. You are expected to complete this assignment within the designated timeframe.</p>
                <p>Assignment Details: </p>
                <p>Assessment Name : ${asessment_name}</p>
                <p>Start Date :  ${start_date} </p>
                <p>End Date : ${end_date} </p>
                <p>We wish you the best of luck with your assignment and look forward to your successful completion within the specified timeframe.
                </p>
                <br>
                <p>Best Regards, </p>
                <p>The ILPex Team</p>
            </div>              
              `, // html body
    });
    return info;
});
const sendAssessmentMail = (receiverMail, username, asessment_name, start_date, end_date) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com", //smtp server of gmail
        port: 465,
        secure: true,
        auth: {
            user: process.env.NOTIFICATION_EMAIL,
            pass: process.env.NOTIFICATION_PASS, //app password in 2 step authenticaion
        },
    });
    const test = yield testMail(transporter, receiverMail, username, asessment_name, start_date, end_date);
    return "success";
});
exports.default = sendAssessmentMail;
