import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import SMTPTransport from "nodemailer/lib/smtp-transport";

dotenv.config();


const testMail = async (transporter:any, receiverMail: string, username: string ,day_number: number) =>{
    const info = await transporter.sendMail({
        from: `"ILPex" <${process.env.NOTIFICATION_EMAIL}>`, // sender address
        to: receiverMail, // list of receivers
        subject: "Incomplete Day Notification", // Subject line
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

}

const sendMail = async (receiverMail: string, username: string,day_number: number) =>{
    console.log("-----------------------------------------",process.env.NOTIFICATION_EMAIL)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,  
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
          
          user: process.env.NOTIFICATION_EMAIL,
          pass: process.env.NOTIFICATION_PASS, //app password in 2 step authenticaion
        },
      }as SMTPTransport.Options);

      const test = await testMail(transporter, receiverMail, username, day_number);

    return "success";

      
}


export default sendMail;



