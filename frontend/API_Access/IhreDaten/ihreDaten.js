const benutzer = require("./../Benutzer/benutzer");
const adresse = require("./../Adresse/adresse");
const person = require("./../Person/person");
const validator = require("./../../Module/Validator/validator");

async function setIhreDaten(body, id) {
  function geb(body) {
    let a = body.geb.split("-");
    if (a.length == 1) {
      return a[0];
    } else {
      let r = "" + a[2] + "." + a[1] + "." + a[0];
      return r;
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
    }
    return str;
  }

  //Holen der Daten für den benutzer

  const benutzerData = await benutzer.getBenutzerbyId(id);

  const vali = await validator.checkIhreDaten(body);

  if (vali.length < 1) {
    const personData = await person.getPersonbyId(benutzerData.daten.person.id);

    const dataAdresse = JSON.stringify({
      id: personData.daten.adresse.id,
      strasse: checkForSS(body.strasse),
      hausnummer: body.hausnr,
      adresszusatz: "",
      plz: body.plz,
      ort: body.stadt,
      land: {
        id: 44,
      },
    });

    //ändern Adresse
    const adresseId = await adresse.updateAddress(dataAdresse);

    //Daten PErson
    const dataPerson = JSON.stringify({
      id: benutzerData.daten.person.id,
      anrede: body.anrede,
      vorname: body.vorname,
      nachname: body.nachname,
      adresse: {
        id: adresseId,
      },
      telefonnummer: "",
      email: body.email,
      geburtstag: geb(body),
    });

    const personId = await person.updatePerson(dataPerson);

    const dataBenutzer = JSON.stringify({
      id: benutzerData.daten.id,
      benutzername: body.username,
      benutzerrolle: {
        id: benutzerData.daten.benutzerrolle.id,
      },
      person: {
        id: personId,
      },
    });

    const benutzerID = await benutzer.updateBenutzer(dataBenutzer);
    return JSON.stringify({
      fehler: null,
    });
  } else {
    let data = JSON.stringify({
      fehler: vali,
    });
    return data;
  }
}

async function getBenutzerDaten(id) {
  const b = await benutzer.getBenutzerbyId(id);

  return b;
}

async function checkBenutzer(body, id) {
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
          if (a.daten[i].id != id) {
            if (a.daten[i].username == body.username) {
              b = false;
            }
            if (a.daten[i].person != null) {
              if (a.daten[i].person.email == body.email) {
                e = false;
              }
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

module.exports = { setIhreDaten, getBenutzerDaten, checkBenutzer };
