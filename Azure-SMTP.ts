import express, { Request, Response } from "express";
import nodemailer from "nodemailer";

const app = express();
const port = 5432;

// Azure AD credentials
const clientId = "a5dead32-ad2f-4bae-bb40-d7b1b0ef66bc";
const clientSecret = "f83923a3-1a72-45ae-a089-ff253d54a4dc";
const tenantId = "5b751804-232f-410d-bb2f-714e3bb466eb";

// Nodemailer setup
const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "pratheep.s@sreegcloudgmail.onmicrosoft.com",
      pass: clientSecret,
    },
  });

// Generate random 4-digit OTP as a string
const generateOTP = () => (1000 + Math.floor(Math.random() * 9000)).toString();

// Store OTPs in memory (replace this with a more secure storage mechanism in production)
const otpStorage: { [email: string]: string } = {};

// Endpoint to send OTP
app.post("/send-otp", async (req: Request, res: Response) => {
  const { email } = req.body;

  const otp = generateOTP();

  // Send OTP via email
  const mailOptions = {
    from: "pratheep.s@sreegcloudgmail.onmicrosoft.com",
    to: email,
    subject: "Verification Code",
    text: `Your verification code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);

    // Store OTP in memory (replace this with a more secure storage mechanism in production)
    otpStorage[email] = otp;

    res.status(200).send("OTP sent successfully!");
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).send("Failed to send OTP.");
  }
});

// Endpoint to verify OTP
app.post("/verify-otp", (req: Request, res: Response) => {
  const { email, enteredOtp } = req.body;

  // Check if entered OTP matches the stored OTP
  if (otpStorage[email] && enteredOtp === otpStorage[email]) {
    res.status(200).json({ success: true, message: "OTP verification successful!" });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP. Please try again." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
