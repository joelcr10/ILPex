import nodemailer from "nodemailer";


const testMail = async (transporter:any) =>{
    const info = await transporter.sendMail({
        from: '"Joel C"<joelcraju@gmail.com>', // sender address
        to: "joel.raju@experionglobal.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      return info;

}

const sendMail = async (res:any) =>{
    console.log("send mail function");
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

      const test = await testMail(transporter);

      console.log(test);

    return res.send("success")

      
}


export default sendMail;



