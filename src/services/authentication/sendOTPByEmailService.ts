// emailService.ts
import nodemailer from "nodemailer";
import Users from "../../models/users";

export const otpStorage: { [email: string]: string } = {};

const generateOTP = () => (1000 + Math.floor(Math.random() * 9000)).toString();

export const sendOTPByEmail = async (email: string) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",  //smtp server of gmail
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "joelcrajudeveloper@gmail.com",
      pass: "xkrv ohcg pxjj sxah", //app password in 2 step authenticaion
    },
  });


  const userFound = await Users.findOne({
    where: { email: email },
  });
  
  if(userFound){
    const otp = generateOTP();

    const testMail = async (transporter:any, email: string) =>{
      const info = await transporter.sendMail({
          from: '"ILPex"', // sender address
          to: email, // list of receivers
          subject: "Verification Code", // Subject line
          // text: "", // plain text body
          html: `
                  <b>Hello ${userFound.user_name}</b>
                  <br>
                  <p>Your verification code is: ${otp}</p>                
                `, // html body
        });
    
        return info;
    
    }
  
    try {
      const test = await testMail(transporter, email);
      otpStorage[email] = otp;
      return true;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return false;
    }
  } else{
     return false;
  }
  
};






