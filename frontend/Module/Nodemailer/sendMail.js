const mail = require("./mail");

async function sendBestellbestaetigung(data) {
  let mailCus = data.besteller.email;
  let subject = "Bestellbestätigung ";
  let text =
    "<h1>Bestellbestätigung</h1>" +
    "<p>Guten Tag" +
    data.besteller.anrede +
    " " +
    data.besteller.nachname +
    ", <br> <br> Sie haben folgendes bestellt: <br> <b>Bestellnummer: </b>" +
    data.id +
    "<br><b>Bestellbestätigunglldatum: </b>" +
    data.bestellzeitpunkt +
    " <br> <table border='1px solid black'>" +
    "<tr><th>Beschreibung</th><th>Menge</th><th>Preis</th> </tr>";
  for (let i = 0; i < data.bestellpositionen.length; i++) {
    text +=
      "<tr> <td> " +
      data.bestellpositionen[i].produkt.bezeichnung +
      "</td><td>" +
      data.bestellpositionen[i].menge +
      "</td> <td>" +
      data.bestellpositionen[i].produkt.nettopreis +
      "</td></tr>";
  }
  text +=
    "</table> <br> <br> <table border='1px solid black'>" +
    "<tr> <th>Gesamtsumme</th> <th>davon Mehrwertsteuer</th> <th>Nettosumme</th>  </tr>" +
    "<tr> <td>" +
    formatSum(data.bruttosumme) +
    "</td> <td>" +
    formatSum(data.bruttosumme) +
    "</td> <td>" +
    formatSum(data.bruttosumme) +
    "</td> </tr> </table>" +
    "<br><b>Zahlungsart: </b> " +
    data.zahlungsart.bezeichnung +
    "<br><b>Hinweis: </b>" +
    data.zahlungsart.beschreibung +
    "<br><br> Vielen Dank für Ihren Einkauf <br>" +
    "<br> Mit freundlichen Grüßen <br> Ihr Kuchenteam </p>";

  const a = await mail.main(mailCus, subject, text);
  if (a != undefined) {
    console.log(a);
  } else {
    console.log("Mail not send");
  }
}

async function sendPasswordVergessen(data, pass) {
  let mailCus = data.person.email;
  let subject = "Password vergessen ";
  let text =
    "<h1>Passwort Vergessen</h1> <p>" +
    "Guten Tag " +
    data.benutzername +
    ", <br /> <br />" +
    "Ihr Passwort wurde zurückgesetzt. <br /> " +
    "Ihr neues Passwort lautet: <br />" +
    "<b>" +
    pass +
    "</b> <br />" +
    "Mit freundlichen Grüßen <br /> Ihr Kuchenteam  </p>";

  const a = await mail.main(mailCus, subject, text);
  if (a != undefined) {
    console.log(a);
  } else {
    console.log("Mail not send");
  }
}

async function sendRegistrierung(data) {
  let mailCus = data.person.email;
  let subject = "Willkommen ";
  let text =
    "<h1>Willkommen</h1> <p>" +
    "Guten Tag" +
    data.benutzername +
    ", <br /> <br />" +
    "vielen Dank, dass Sie sich für unseren Kuchenservice entschieden haben.";
  ("<br /> Mit freundlichen Grüßen <br /> Ihr Kuchenteam </p>");

  const a = await mail.main(mailCus, subject, text);
  if (a != undefined) {
    console.log(a);
  } else {
    console.log("Mail not send");
  }
}

function formatSum(n) {
  let number = Number(n);
  let n2 = "" + Math.round(number * 100) / 100;
  let n3 = n2.split(".");
  if (n3[1] == undefined) {
    return n3[0] + ",00";
  } else {
    if (n3[1].length == 1) {
      return n3[0] + "," + n3[1] + "0";
    } else {
      return n3[0] + "," + n3[1];
    }
  }
}

module.exports = {
  sendBestellbestaetigung,
  sendPasswordVergessen,
  sendRegistrierung,
};
