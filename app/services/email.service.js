const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });


module.exports = {
    /*
        to : Destinataire
        mail: {
            subject,
            text,
            html
        }

        example:

        sendMail("abrahamramilison+nodemailer@gmail.com", {
            subject:"Ity nge jereo ndray e!👀👀",
            text:"test2",
            html:"<h1>👋🔥</h1>"
        })
    */
    sendMail : async function(to,mail){
        transporter.sendMail({
            from: `"${process.env.MAIL_PSEUDO}" <${process.env.MAIL_USER}>`, // sender address
            to: to, // list of receivers
            subject: mail.subject, // Subject line
            text: mail.text, // plain text body
            html: mail.html, // html body
          }).then(res => {
            console.log({res});
          }).catch(console.error);
    }
}
