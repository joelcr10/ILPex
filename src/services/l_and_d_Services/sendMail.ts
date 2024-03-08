import nodemailer from "nodemailer";


const testMail = async (transporter:any, receiverMail: string, username: string ,day_number: number) =>{
    const info = await transporter.sendMail({
        from: '"ILPex"', // sender address
        to: receiverMail, // list of receivers
        subject: "Incomplete Day Notification", // Subject line
        // text: "", // plain text body
        html: `
                <b>Hello ${username}</b>
                <br>
                <p>You haven't completed the Day ${day_number} track</p>                
              `, // html body
      });

      return info;

}

const sendMail = async (receiverMail: string, username: string,day_number: number) =>{
    
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

      const test = await testMail(transporter, receiverMail, username, day_number);

    return "success";

      
}


export default sendMail;



