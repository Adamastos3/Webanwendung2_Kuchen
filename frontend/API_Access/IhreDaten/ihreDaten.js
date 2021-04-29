const benutzer = require("./../Benutzer/benutzer");
const adresse = require("./../Adresse/adresse");
const person = require("./../Person/person");

async function setIhreDaten(body, id) {
  //Holen der Daten für den benutzer
  console.log(body)
  console.log(id)
  const benutzerData = await benutzer.getBenutzerbyId(id);

  console.log("benutzer geholt")
  const dataAdresse = JSON.stringify({
    id: benutzerData.person.adresse.id,
    strasse: body.strasse,
    hausnummer: body.hausnr,
    adresszusatz: "",
    plz: body.plz,
    ort: body.stadt,
    land: {
      id: 44
    }
  });

  console.log(dataAdresse)
  console.log("dataAdress fertig")

  //ändern Adresse
  const adresseId = await adresse.updateAddress(dataAdresse);

  console.log("adresse geändert")
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

console.log(dataPerson)
console.log("daten person")
  const personId = await person.updatePerson(dataPerson);

  console.log("person geändert")

  const dataBenutzer = JSON.stringify({
    id: benutzerData.id,
    benutzername: body.username,
    benutzerrolle: {
      id: benutzerData.benutzerrolle.id,
    },
    person: {
      id: personId,
    },
  });

  console.log(dataBenutzer);
  console.log("benutzer daten")

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
  //bug
  let a = body.geb.split("-");
  console.log("geb "+ a)
  if (a.length ==1){
    return a[0]
  }else{
    let r = "" + a[2] + "." + a[1] + "." + a[0];
    console.log(r);
    return r;
  }
}

module.exports = setIhreDaten;
