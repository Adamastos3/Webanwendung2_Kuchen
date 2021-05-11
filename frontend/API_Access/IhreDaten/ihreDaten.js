const benutzer = require("./../Benutzer/benutzer");
const adresse = require("./../Adresse/adresse");
const person = require("./../Person/person");
const validator = require("./../../Module/Validator/validator");

async function setIhreDaten(body, id) {
  //Holen der Daten für den benutzer
  console.log(body);
  console.log(id);

  const benutzerData = await benutzer.getBenutzerbyId(id);
  console.log("BenutzerData");
  console.log(benutzerData);
  const vali = await validator.checkIhreDaten(body);
  console.log(vali);
  //const check = await console.log("benutzer geholt");
  if (vali.length < 1) {
    const personData = await person.getPersonbyId(benutzerData.daten.person.id);
    console.log(personData);
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

    console.log(dataAdresse);
    console.log("dataAdress fertig");

    //ändern Adresse
    const adresseId = await adresse.updateAddress(dataAdresse);

    console.log("adresse geändert");
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

    console.log(dataPerson);
    console.log("daten person");
    const personId = await person.updatePerson(dataPerson);

    console.log("person geändert");

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

    console.log(dataBenutzer);
    console.log("benutzer daten");

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
/*
function setAnrede(anrede) {
  if (anrede == "Herr") {
    return "Herr";
  } else {
    return "Frau";
  }
}
*/

function geb(body) {
  //bug
  let a = body.geb.split("-");
  console.log("geb " + a);
  if (a.length == 1) {
    return a[0];
  } else {
    let r = "" + a[2] + "." + a[1] + "." + a[0];
    console.log(r);
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

async function getBenutzerDaten(id) {
  const b = await benutzer.getBenutzerbyId(id);

  console.log(b);
  return b;
}

async function checkBenutzer(body, id) {
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
    console.log("catch");
    return resp;
  }
}

module.exports = { setIhreDaten, getBenutzerDaten, checkBenutzer };
