const validator = require("validator");

async function checkLogin(body) {
  let error = [];
  const b = await validator.isAlphanumeric(body.username);
  const c = await validator.isLength(body.username, [{ min: 3, max: 20 }]);

  if (!b && !c) {
    error.push({
      bezeichnung:
        "Username muss AlpaNumerisch sein und mindestens drei Zeichen lang sein aber ncht mehr als 20 Zeichen haben",
    });
  }

  return error;
}

async function checkMail(body) {
  let error = [];
  const b = await validator.isEmail(body.email);

  if (!b) {
    error.push({
      bezeichnung: "Email is not a Mail",
    });
  }

  return error;
}

async function checkPassword(body) {
  let error = [];
  const b = await validator.isStrongPassword(body.pass);

  if (!b) {
    error.push({
      bezeichnung:
        "Passwort need a length of 8. It need Uppercase, symbols,numbers and lowercase",
    });
  }

  return error;
}

async function checkDate(date) {
  let error = [];
  const b = await validator.isDate(date);

  if (!b) {
    error.push({
      bezeichnung: "Datum ist nicht richtig formatiert",
    });
  }

  return error;
}

async function checkVorname(body) {
  let error = [];
  const b = await validator.isAlpha(body.vorname);
  const c = await validator.isLength(body.vorname, [{ min: 3, max: 50 }]);

  if (!b && !c) {
    error.push({
      bezeichnung:
        "Vorname muss aus Buchstaben bestehen und mindestens drei Buchstaben haben",
    });
  }

  return error;
}

async function checkNachname(body) {
  let error = [];
  const b = await validator.isAlpha(body.nachname);
  const c = await validator.isLength(body.nachname, [{ min: 3, max: 50 }]);

  if (!b && !c) {
    error.push({
      bezeichnung:
        "Nachname muss aus Buchstaben bestehen und mindestens drei Buchstaben haben",
    });
  }

  return error;
}

async function checkStrasse(body) {
  function checkForSS(text) {
    let str = "";
    if (text.includes("ß")) {
      for (let i = 0; i < text.length; i++) {
        if (text[i] == "ß") {
          str += "ss";
        } else {
          str += text[i];
        }
      }
    }
    return str;
  }

  let error = [];
  const str = checkForSS(body.strasse);
  const b = await validator.isAlpha(str);
  const c = await validator.isLength(str, [{ min: 3, max: 50 }]);

  if (!b && !c) {
    error.push({
      bezeichnung:
        "text muss aus Buchstaben bestehen und mindestens drei Buchstaben haben",
    });
  }

  return error;
}

async function checkStadt(body) {
  let error = [];
  const b = await validator.isAlpha(body.stadt);
  const c = await validator.isLength(body.stadt, [{ min: 3, max: 50 }]);

  if (!b && !c) {
    error.push({
      bezeichnung:
        "Stadt muss aus Buchstaben bestehen und mindestens drei Buchstaben haben",
    });
  }

  return error;
}

async function checkAnrede(body) {
  let error = [];
  const b = await validator.isAlpha(body.anrede);
  const c = await validator.isLength(body.anrede, [{ min: 4, max: 5 }]);

  if (!b && !c) {
    error.push({
      bezeichnung:
        "Anrede muss aus Buchstaben bestehen und mindestens drei Buchstaben haben",
    });
  }

  return error;
}

async function checkGeb(body) {
  let error = [];
  const b = await validator.isDate(body.geb);

  if (!b) {
    error.push({
      bezeichnung: "Geburtsdatum ist kein Datum",
    });
  }

  return error;
}

async function checkHausnr(body) {
  let error = [];
  const b = await validator.isNumeric(body.hausnr);
  const c = await validator.isLength(body.hausnr, [{ min: 1, max: 5 }]);

  if (!b && !c) {
    error.push({
      bezeichnung: "Hausnummer muss eine Zahl sein ",
    });
  }

  return error;
}

async function checkPLZ(body) {
  let error = [];
  const b = await validator.isNumeric(body.plz);
  const c = await validator.isLength(body.plz, [{ min: 5, max: 5 }]);
  if (!b && !c) {
    error.push({
      bezeichnung: "PLZ muss eine Zahl mit 5 Stellen sein ",
    });
  }

  return error;
}

async function checkProdukt(id) {
  let error = [];
  const b = await validator.isNumeric(id);
  const c = await validator.isLength(id, [{ min: 1, max: 4 }]);

  if (!b && !c) {
    error.push({
      bezeichnung: "Keine Nummer ",
    });
  }

  return error;
}

async function checkID(id) {
  let error = [];
  const b = await validator.isNumeric("" + id);
  const c = await validator.isLength("" + id, [{ min: 1, max: 4 }]);

  if (!b && !c) {
    error.push({
      bezeichnung: "Keine gültige Nummer ",
    });
  }

  return error;
}

async function checkText(body) {
  let error = [];
  let data =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?. ";
  for (let i = 0; i < body.text.length; i++) {
    if (data.includes(body.text[i])) {
      continue;
    } else {
      error.push({
        bezeichnung: "Falsche Zeichen ",
      });
      return error;
    }
  }
  return error;
}

async function checkWarenkorbInhalt(body) {
  let error = [];
  let data = "0123456789/-";
  let str = body;
  for (let i = 0; i < str.length; i++) {
    if (data.includes(str.charAt(i))) {
      continue;
    } else {
      error.push({
        bezeichnung: "Falsche Zeichen ",
      });
      return error;
    }
  }
  return error;
}

async function checkKasseProdukt(body) {
  let checkOne = await validator.isNumeric("" + body.id);
  let checkTwo = await validator.isNumeric("" + body.menge);

  let checkThree = false;
  if (body.bezeichnung === "regular" || body.bezeichnung === "individuel") {
    checkThree = true;
  }

  if (checkOne && checkThree && checkTwo) {
    return true;
  } else {
    return false;
  }
}

async function checkKasseZahlung(body) {
  let a = await validator.isAlpha(body.bezahlung);

  let b = false;
  if (
    body.bezahlung === "Vorkasse" ||
    body.bezahlung === "Rechnung" ||
    body.bezahlung === "Bar"
  ) {
    b = true;
  }

  if (a && b) {
    return true;
  } else {
    return false;
  }
}

async function checkKasse(body) {
  let elem = body.produkt;
  let res = [];
  for (let i = 0; i < elem.length; i++) {
    let a = await checkKasseProdukt(body.produkt[i]);
    let b = await checkKasseZahlung(body);
    let c = await checkDate(body.lieferdatum);
    if (a && b && c) {
      res.push(true);
    } else {
      res.push(false);
    }
  }

  for (let j = 0; j < res.length; j++) {
    if (res[j] == false) {
      return false;
    }
  }
  return true;
}

async function checkPasswortVergessen(body) {
  let error = [];
  let er = [];
  er.push(await checkLogin(body));
  er.push(await checkMail(body));

  for (let i = 0; i < er.length; i++) {
    if (er[i].length == 1) {
      error.push(er[i]);
    }
  }

  return error;
}

async function checkWarenkorbPost(body) {
  let error = [];
  let er = [];

  er.push(checkID(body.benutzerid));
  er.push(checkWarenkorbInhalt(body.warenkorb));

  for (let i = 0; i < er.length; i++) {
    if (er[i].length == 1) {
      error.push(er[i]);
    }
  }

  return error;
}

async function checkWarenkorb(body) {
  let error = [];
  let er = [];

  er.push(checkID(body.id));
  er.push(checkID(body.benutzerid));
  er.push(checkWarenkorbInhalt(body.warenkorb));

  for (let i = 0; i < er.length; i++) {
    if (er[i].length == 1) {
      error.push(er[i]);
    }
  }

  return error;
}

async function checkRegister(body) {
  let error = [];
  let er = [];
  er.push(await checkLogin(body));
  er.push(await checkMail(body));
  er.push(await checkHausnr(body));
  er.push(await checkNachname(body));
  er.push(await checkAnrede(body));
  er.push(await checkGeb(body));
  er.push(await checkPLZ(body));
  er.push(await checkPassword(body));
  er.push(await checkStadt(body));
  er.push(await checkStrasse(body));
  er.push(await checkVorname(body));

  for (let i = 0; i < er.length; i++) {
    if (er[i].length == 1) {
      error.push(er[i]);
    }
  }

  return error;
}

async function checkIhreDaten(body) {
  let error = [];
  let er = [];
  er.push(await checkLogin(body));
  er.push(await checkMail(body));
  er.push(await checkHausnr(body));
  er.push(await checkNachname(body));
  er.push(await checkAnrede(body));
  er.push(await checkGeb(body));
  er.push(await checkPLZ(body));
  er.push(await checkStadt(body));
  er.push(await checkStrasse(body));
  er.push(await checkVorname(body));

  for (let i = 0; i < er.length; i++) {
    if (er[i].length == 1) {
      error.push(er[i]);
    }
  }

  return error;
}

async function checkKundenDaten(body) {
  let error = [];
  let er = [];
  er.push(await checkLogin(body));
  er.push(await checkMail(body));
  er.push(await checkHausnr(body));
  er.push(await checkNachname(body));
  er.push(await checkAnrede(body));
  er.push(await checkGeb(body));
  er.push(await checkPLZ(body));
  er.push(await checkStadt(body));
  er.push(await checkStrasse(body));
  er.push(await checkVorname(body));
  er.push(await checkPassword(body));

  for (let i = 0; i < er.length; i++) {
    if (er[i].length == 1) {
      error.push(er[i]);
    }
  }

  return error;
}

async function checkKontakt(body) {
  let error = [];
  let er = [];
  er.push(await checkLogin(body));
  er.push(await checkMail(body));
  er.push(await checkNachname(body));
  er.push(await checkAnrede(body));
  er.push(await checkVorname(body));
  er.push(await checkText(body));

  for (let i = 0; i < er.length; i++) {
    if (er[i].length == 1) {
      error.push(er[i]);
    }
  }

  return error;
}

module.exports = {
  checkLogin,
  checkMail,
  checkPassword,
  checkRegister,
  checkIhreDaten,
  checkProdukt,
  checkID,
  checkKasse,
  checkKundenDaten,
  checkPasswortVergessen,
  checkKontakt,
  checkWarenkorb,
  checkWarenkorbPost,
};
