import nodemailer from "nodemailer";
import Users from "../../models/users";

export const otpStorage: { [email: string]: string } = {};

const generateOTP = () => (1000 + Math.floor(Math.random() * 9000)).toString();

export const sendOTPByEmail = async (email: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "joelcrajudeveloper@gmail.com",
      pass: "xkrv ohcg pxjj sxah",
    },
  });

  const userFound = await Users.findOne({
    where: { email: email },
  });

  if (userFound) {
    const otp = generateOTP();

    const testMail = async (transporter: any, email: string) => {
      const info = await transporter.sendMail({
        from: '"ILPex" <joelcrajudeveloper@gmail.com>', // sender address
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
    };

    try {
      const test = await testMail(transporter, email);
      otpStorage[email] = otp;
      return true;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return false;
    }
  } else {
    return false;
  }
};
