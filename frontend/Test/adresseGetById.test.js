const adresse = require("../API_Access/Adresse/adresse");
const result1 = {
  daten: {
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
  fehler: false,
  nachricht: "OK",
};

test("Return of the address at Id 1", async () => {
  expect(await adresse.getAddressbyId(1)).toEqual(result1);
});
