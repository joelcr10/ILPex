import nodemailer from "nodemailer";
import Users from "../../models/users";

export const sendWelcomeEmail = async (email: string, password:string) => {
  
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
    const sendMail = async (transporter: any, email: string) => {
      const info = await transporter.sendMail({
        from: '"ILPex" <joelcrajudeveloper@gmail.com>',
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
    };

    try {
      const result = await sendMail(transporter, email);
      console.log("Welcome email sent:", result);
      return true;
    } catch (error) {
      console.error("Error sending welcome mail:", error);
      return false;
    }
  } else {
    console.error("User not found for email:", email);
    return false;
  }
};
