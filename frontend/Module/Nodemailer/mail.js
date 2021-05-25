"use strict";
const nodemailer = require("nodemailer");

async function main(email, subject, text) {
  let transporter = nodemailer.createTransport({
    //enter your own data
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
    html: text, // html body
  });

  if (info != undefined) {
    resolve(info.messageId);
  } else {
    reject("Mail fehler");
  }
  // Message sent: <[email protected]>
}

//main().catch(console.error);

module.exports = {
  main,
};
