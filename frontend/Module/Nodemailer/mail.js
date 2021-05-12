"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(email, subject, text) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "test01@gmail.com",
      pass: "",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "kuchentest01@gmail.com",
    to: email, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <[email protected]>
}

//main().catch(console.error);

module.exports = {
  main,
};
