const benutzer = require("../Benutzer/benutzer");
const person = require("../Person/person");
const adresse = require("../Adresse/adresse");
const validator = require("../../Module/Validator/validator");

async function getKunden() {
  let data = [];
  let result = "";
  const a = await benutzer.getBenutzerAll();
  if (a.daten != null) {
    for (let i = 0; i < a.daten.length; i++) {
      if (a.daten[i].benutzerrolle.id == 3) {
        data.push(a.daten[i]);
      }
    }
    result = JSON.stringify({
      fehler: null,
      daten: data,
    });
    return result;
  }
}

async function getKunde(id) {
  const a = await validator.checkID(id);
  if (a.length < 1) {
    const b = benutzer.getBenutzerbyId(id);
    return b;
  }
}

async function setKunde(body) {
  console.log(body);
  let pN = false;
  function setPassToOld(body) {
    if (body.pass == "") {
      body.pass = "123456789Ab.";
      pN = true;
    }
  }
  console.log("pn");
  console.log(pN);
  const benutzerData = await benutzer.getBenutzerbyId(body.id);
  gebToUSA(body);
  setPassToOld(body);
  console.log(body);
  const vali = await validator.checkKundenDaten(body);

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
      geburtstag: gebToGerman(body),
    });

    const personId = await person.updatePerson(dataPerson);
    let dataBenutzer = "";
    if (pN) {
      dataBenutzer = JSON.stringify({
        id: benutzerData.daten.id,
        benutzername: body.username,
        benutzerrolle: {
          id: benutzerData.daten.benutzerrolle.id,
        },
        person: {
          id: personId,
        },
      });
    } else {
      dataBenutzer = JSON.stringify({
        id: benutzerData.daten.id,
        neuespasswort: body.pass,
        benutzername: body.username,
        benutzerrolle: {
          id: benutzerData.daten.benutzerrolle.id,
        },
        person: {
          id: personId,
        },
      });
    }
    console.log("data benutzer");
    console.log(dataBenutzer);
    const benutzerID = await benutzer.updateBenutzer(dataBenutzer);
    if (benutzerID != null) {
      return JSON.stringify({
        fehler: null,
      });
    } else {
      return JSON.stringify({
        fehler: [{ bezeichnung: "Serverfehler" }],
      });
    }
  } else {
    let data = JSON.stringify({
      fehler: vali,
    });
    return data;
  }
}

async function deleteKunden(req) {
  const a = validator.checkID(req.params.id);
  if (a.length < 1) {
    const b = benutzer.deleteBenutzer(req.params.id);
    console.log(b);
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

function gebToGerman(body) {
  let a = body.geb.split("-");
  if (a.length == 1) {
    return a[0];
  } else {
    let r = "" + a[2] + "." + a[1] + "." + a[0];
    return r;
  }
}

function gebToUSA(body) {
  let a = body.geb.split("-");
  body.geb = "" + a[2] + "-" + a[1] + "-" + a[0];
}

module.exports = { getKunden, getKunde, setKunde, deleteKunden };
