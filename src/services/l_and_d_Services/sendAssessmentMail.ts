import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();


const testMail = async (transporter:any, receiverMail: string, username: string ,asessment_name : string, start_date : string, end_date : string) =>{
    const info = await transporter.sendMail({
        from: `"ILPex" <${process.env.NOTIFICATION_EMAIL}>`, // sender address
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

}

const sendAssessmentMail = async (receiverMail: string, username: string, asessment_name : string, start_date : string, end_date : string) =>{
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",  //smtp server of gmail
        port: 465,
        secure: true,
        auth: {
          
          user: process.env.NOTIFICATION_EMAIL,
          pass: process.env.NOTIFICATION_PASS, //app password in 2 step authenticaion
        },
      });

      const test = await testMail(transporter, receiverMail, username, asessment_name, start_date, end_date);

    return "success";

      
}


export default sendAssessmentMail;



