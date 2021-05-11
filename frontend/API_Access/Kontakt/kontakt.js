const mail = require("../../Module/Nodemailer/mail");
const validator = require("../../Module/Validator/validator");

async function sendKontakt(body) {
  const a = await validator.checkKontakt(body);
  if (a.length < 1) {
    await sendToEmployee(body);
    await sendToKontakt(body);
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
    "Guten Tag " +
    body.anrede +
    " " +
    body.nachname +
    ",\n" +
    "\n vielen Dank das Sie uns Kontaktiert haben. Ein Mitarbeiter wird sich in Kürze mit Ihnen in Verbindung setzen.\n\n" +
    "Mit freundlichen Grüßen\n" +
    "Ihr Kuchenteam";

  let subject = "Kontaktaufnahme";

  await mail.main(body.email, subject, text);
}

async function sendToEmployee(body) {
  let internMail = "info@kuchen.de"; //Mail muss angepast werden
  let text =
    "Folgender KOntakt wurde zu uns gesendet\n" +
    "Anrede: " +
    body.anrede +
    "\n" +
    "Vorname: " +
    body.vorname +
    "\n" +
    "Nachname: " +
    body.nachname +
    "\n" +
    "Email: " +
    body.email +
    "\n" +
    "Text: " +
    body.text +
    "\n";

  let subject = "Kontaktaufname " + body.vorname + " " + body.nachname;

  await mail.main(internMail, subject, text);
}

module.exports = {
  sendKontakt,
};
