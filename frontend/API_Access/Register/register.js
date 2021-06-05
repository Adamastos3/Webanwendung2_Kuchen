const person = require("../Person/person");
const adresse = require("../Adresse/adresse");
const benutzer = require("../Benutzer/benutzer");
const validator = require("../../Module/Validator/validator");
const mail = require("../../Module/Nodemailer/sendMail");

async function register(body) {
  try {
    const check = await validator.checkRegister(body);
    if (check.length < 1) {
      const checkData = JSON.stringify({
        benutzername: body.username,
      });
      const excist = await benutzer.checkBenutzer(checkData);
      if (excist) {
        const bdata = await InputNewUser(body);
        if (bdata.id > 0) {
          return JSON.stringify({
            fehler: null,
          });
        } else {
          return JSON.stringify({
            fehler: [{ bezeichnung: "Serverfehler" }],
          });
        }
      } else {
        return JSON.stringify({
          fehler: [{ bezeichnung: "Benutzer existiert schon" }],
        });
      }
    } else {
      let data = JSON.stringify({
        fehler: check,
      });
      return data;
    }
  } catch {
    return JSON.stringify({
      fehler: [{ bezeichnung: "ServerFehler" }],
    });
  }
}

async function InputNewUser(body) {
  function anrede(body) {
    if (body.Herr != undefined) {
      return "Herr";
    } else {
      return "Frau";
    }
  }

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
    } else {
      return text;
    }
    return str;
  }

  function geb(body) {
    let a = body.geb.split("-");
    let r = "" + a[2] + "." + a[1] + "." + a[0];
    return r;
  }

  const dataAdresse = JSON.stringify({
    strasse: checkForSS(body.strasse),
    hausnummer: body.hausnr,
    adresszusatz: "",
    plz: body.plz,
    ort: body.stadt,
    land: {
      id: 44,
    },
  });

  const adressId = await adresse.createAddress(dataAdresse);

  const dataPerson = JSON.stringify({
    anrede: body.anrede,
    vorname: body.vorname,
    nachname: body.nachname,
    adresse: {
      id: adressId,
    },
    telefonnummer: "",
    email: body.email,
    geburtstag: geb(body),
  });

  const personId = await person.createPerson(dataPerson);

  const dataUser = JSON.stringify({
    id: 1,
    benutzername: body.username,
    passwort: body.pass,
    benutzerrolle: {
      id: 3,
    },
    person: {
      id: personId,
    },
  });

  const benutzerid = await benutzer.createBenutzer(dataUser);
  //MAil muss aktivert werden
  //const info = await mail.sendRegistrierung(benutzerid);
  return benutzerid;
}

async function checkBenutzerMail(body) {
  const resp = JSON.stringify({
    email: false,
    user: false,
  });
  try {
    let a = await benutzer.getBenutzerAll();
    let cb = await validator.checkLogin(body);
    let cm = await validator.checkMail(body);

    if (cb.length < 1 && cm.length < 1) {
      if (a.daten != null) {
        let b = true;
        let e = true;
        for (let i = 0; i < a.daten.length; i++) {
          if (a.daten[i].username == body.username) {
            b = false;
          }
          if (a.daten[i].person != null) {
            if (a.daten[i].person.email == body.email) {
              e = false;
            }
          }
        }
        return JSON.stringify({
          email: e,
          user: b,
        });
      } else {
        return resp;
      }
    } else {
      return resp;
    }
  } catch {
    return resp;
  }
}

module.exports = { register, checkBenutzerMail };
