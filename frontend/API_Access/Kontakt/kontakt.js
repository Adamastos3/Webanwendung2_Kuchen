const mail = require("../../Module/Nodemailer/mail");
const validator = require("../../Module/Validator/validator");

async function sendKontakt(body) {
  const a = await validator.checkKontakt(body);
  if (a.length < 1) {
    //Muss aktiviert werden
    //await sendToEmployee(body);
    //await sendToKontakt(body);
    return JSON.stringify({
      fehler: null,
    });
  } else {
    return JSON.stringify({
      fehler: a,
    });
  }
}

async function sendToKontakt(body) {
  let text =
    "<p>" +
    "Guten Tag " +
    body.anrede +
    " " +
    body.nachname +
    ", <br />" +
    "<br />" +
    "vielen Dank das Sie uns Kontaktiert haben. Ein Mitarbeiter wird sich in Kürze mit Ihnen in Verbindung setzen. <br />  <br />" +
    "Mit freundlichen Grüßen <br />" +
    "Ihr Kuchenteam     </p>";

  let subject = "Vielen Dank für Ihre Kontaktaufnahme";

  await mail.main(body.email, subject, text);
}

async function sendToEmployee(body) {
  let internMail = "info@kuchen.de"; //muss angepasst werden
  let text =
    "<p>" +
    "Folgender Kontakt wurde zu uns gesendet: <br /> <br />" +
    "Anrede: " +
    body.anrede +
    "<br />" +
    "Vorname: " +
    body.vorname +
    "<br />" +
    "Nachname: " +
    body.nachname +
    "<br />" +
    "Email: " +
    body.email +
    "<br />" +
    "Text: " +
    body.text +
    "<br /> </p>";

  let subject = "Kontaktaufname " + body.vorname + " " + body.nachname;

  await mail.main(internMail, subject, text);
}

module.exports = {
  sendKontakt,
};
