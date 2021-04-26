const benutzer = require("./../Benutzer/benutzer");
const adresse = require("./../Adresse/adresse");
const person = require("./../Person/person");

async function setIhreDaten(body, id) {
  //Holen der Daten für den benutzer
  const benutzerData = await benutzer.getBenutzerbyId(id);

  const dataAdresse = JSON.stringify({
    id: benutzerData.person.adresse.id,
    strasse: body.strasse,
    hausnummer: body.hausnummer,
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
    id: benutzerData.person.id,
    anrede: setAnrede(body.herr),
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
    id: benutzerData.id,
    benutzername: body.username,
    benutzerrolle: {
      id: benutzerData.benutzername.id,
    },
    person: {
      id: personId,
    },
  });

  const benutzerID = await benutzer.updateBenutzer(dataBenutzer);
  return benutzerID;
}

function setAnrede(anrede) {
  if (anrede == "Herr") {
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

module.exports = setIhreDaten;
