const benutzer = require("../API_Access/Benutzer/benutzer");
const data = JSON.stringify({
  benutzername: "master",
  passwort: "123456789Ab.",
});
const result1 = {
  nachricht: "OK",
  fehler: false,
  daten: {
    benutzername: "master",
    benutzerrolle: {
      bezeichnung: "Administrator",
      id: 1,
    },
    id: 1,
    passwort: "4dd90a11be4f59430018e548dde38bf7",
    person: {
      adresse: {
        adresszusatz: "",
        hausnummer: "5",
        id: 1,
        land: {
          bezeichnung: "Deutschland",
          id: 44,
          kennzeichnung: "DE",
        },
        ort: "Ebingen",
        plz: "72458",
        strasse: "Johannesstrasse",
      },
      anrede: "Herr",
      email: "admin@kuchen.de",
      geburtstag: "06.05.1980",
      id: 13,
      nachname: "Seifriz",
      telefonnummer: "",
      vorname: "Chris",
    },
  },
};

test("Return of the user with Id 1 exist", async () => {
  expect(await benutzer.checkBenutzerUndPassword(data)).toEqual(result1);
});
