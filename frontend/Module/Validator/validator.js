const validator = require("validator");

async function checkLogin(body) {
  let error = [];
  const b = await validator.isAlphanumeric(body.username);
  const c = await validator.isLength(body.username, [{ min: 3, max: 20 }]);
  console.log(b);
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
  console.log(b);
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
  console.log(b);
  if (!b) {
    error.push({
      bezeichnung:
        "Passwort need a length of 8. It need Uppercase, symbols,numbers and lowercase",
    });
  }

  return error;
}

async function checkVorname(body) {
  let error = [];
  const b = await validator.isAlpha(body.vorname);
  const c = await validator.isLength(body.vorname, [{ min: 3, max: 50 }]);
  console.log(b);
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
  console.log(b);
  if (!b && !c) {
    error.push({
      bezeichnung:
        "Nachname muss aus Buchstaben bestehen und mindestens drei Buchstaben haben",
    });
  }

  return error;
}

async function checkStrasse(body) {
  let error = [];
  const b = await validator.isAlpha(body.strasse);
  const c = await validator.isLength(body.strasse, [{ min: 3, max: 50 }]);
  console.log(b);
  if (!b && !c) {
    error.push({
      bezeichnung:
        "Strasse muss aus Buchstaben bestehen und mindestens drei Buchstaben haben",
    });
  }

  return error;
}

async function checkStadt(body) {
  let error = [];
  const b = await validator.isAlpha(body.stadt);
  const c = await validator.isLength(body.stadt, [{ min: 3, max: 50 }]);
  console.log(b);
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
  console.log(b);
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

  console.log(b);
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
  console.log(b);
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
  console.log(b);
  if (!b && !c) {
    error.push({
      bezeichnung: "PLZ muss eine Zahl mit 5 Stellen sein ",
    });
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

module.exports = {
  checkLogin,
  checkMail,
  checkPassword,
  checkRegister,
  checkIhreDaten,
};
