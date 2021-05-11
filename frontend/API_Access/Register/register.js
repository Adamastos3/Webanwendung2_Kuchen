const person = require("../Person/person");
const adresse = require("../Adresse/adresse");
const benutzer = require("../Benutzer/benutzer");
const validator = require("../../Module/Validator/validator");

async function register(body) {
  try {
    console.log("body register");
    console.log(body);
    const check = await validator.checkRegister(body);
    console.log(check);
    if (check.length < 1) {
      const checkData = JSON.stringify({
        benutzername: body.username,
      });
      console.log(checkData);
      const excist = await benutzer.checkBenutzer(checkData);
      console.log(excist);
      if (excist) {
        const id = await InputNewUser(body);
        if (id > 0) {
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

  function geb(body) {
    let a = body.geb.split("-");
    let r = "" + a[2] + "." + a[1] + "." + a[0];
    console.log(r);
    return r;
  }

  const dataAdresse = JSON.stringify({
    strasse: body.strasse,
    hausnummer: body.hausnr,
    adresszusatz: "",
    plz: body.plz,
    ort: body.stadt,
    land: {
      id: 44,
    },
  });

  console.log(dataAdresse);
  const adressId = await adresse.createAddress(dataAdresse);
  console.log(adressId);

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

  console.log(dataAdresse);
  const personId = await person.createPerson(dataPerson);
  console.log(personId);

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
  console.log(dataUser);
  const benutzerid = await benutzer.createBenutzer(dataUser);
  console.log(benutzerid);
  return benutzerid;
}

async function checkBenutzerMail(body) {
  const resp = JSON.stringify({
    email: false,
    user: false,
  });
  try {
    console.log("body");
    console.log(body);
    console.log(body.username);
    let a = await benutzer.getBenutzerAll();
    let cb = await validator.checkLogin(body);
    let cm = await validator.checkMail(body);
    console.log(a);
    console.log(cb);
    console.log(cm);
    if (cb.length < 1 && cm.length < 1) {
      console.log("register 1");
      if (a.daten != null) {
        console.log("register2");
        console.log(a.daten);
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
    console.log("catch");
    return resp;
  }
}

module.exports = { register, checkBenutzerMail };
