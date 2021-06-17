const validator = require("../../Module/Validator/validator");
const produkt = require("./produkt");

async function createProdukt(body) {
  const a = await validator.checkProduktAdmin(body);
  if (a.length < 1) {
    let datenblatt = JSON.stringify({
      bezeichnung: body.bezeichnung,
      beschreibung: body.bezeichnung,
      dateipfad: body.datenblatt,
    });

    console.log(datenblatt);
    const da = await produkt.createDatenblatt(datenblatt);
    console.log(da);

    let produktdata = JSON.stringify({
      bezeichnung: body.bezeichnung,
      beschreibung: body.beschreibung,
      details: body.details,
      nettopreis: setPreis(body),
      geloescht: 0,
      datenblatt: {
        id: da.id,
      },
      kategorie: {
        id: 1,
      },
      mehrwertsteuer: {
        id: 2,
      },
      bilder: [{ bildpfad: body.bildpfad }],
    });

    console.log(produktdata);

    const pro = await produkt.createProdukt(produktdata);

    return JSON.stringify({
      fehler: null,
    });
  } else {
    return JSON.stringify({
      fehler: a,
    });
  }
}

async function changeProdukt(body) {
  console.log("Change Produkt");
  console.log(body);
  const a = await validator.checkProduktAdmin(body);

  if (a.length < 1) {
    const a = await produkt.getProduktById(1, body.id);
    console.log(a);
    let datenblattdata = JSON.stringify({
      id: a.daten.datenblatt.id,
      bezeichnung: a.daten.datenblatt.bezeichnung,
      beschreibung: a.daten.datenblatt.bezeichnung,
      dateipfad: body.datenblatt,
    });

    const a2 = await produkt.changeDatenblatt(datenblattdata);
    console.log(a2);

    let produktdata = JSON.stringify({
      id: body.id,
      bezeichnung: body.bezeichnung,
      beschreibung: body.beschreibung,
      details: body.details,
      nettopreis: setPreis(body),
      datenblatt: {
        id: a2.id,
      },
      kategorie: {
        id: 1,
      },
      mehrwertsteuer: {
        id: 2,
      },
      bilder: [{ bildpfad: body.bildpfad }],
    });

    console.log(produktdata);
    const a3 = await produkt.changeProdukt(produktdata);

    return JSON.stringify({
      fehler: null,
    });
  } else {
    console.log("Back");
    return JSON.stringify({
      fehler: a,
    });
  }
}

async function deleteProdukt(id) {
  const a = await validator.checkID(id);
  if (a.length < 1) {
    const pro = await produkt.getProduktById(1, id);
    const daten = JSON.stringify({
      id: pro.daten.id,
      bezeichnung: pro.daten.bezeichnung,
      beschreibung: pro.daten.beschreibung,
      details: pro.daten.details,
      nettopreis: pro.daten.nettopreis,
      geloescht: 1,
      datenblatt: {
        id: pro.daten.datenblatt.id,
      },
      kategorie: {
        id: 1,
      },
      mehrwertsteuer: {
        id: pro.daten.mehrwertsteuer.id,
      },
      bilder: [{ bildpfad: pro.daten.bilder[0].bildpfad }],
    });

    console.log(daten);
    const a3 = await produkt.changeProdukt(daten);

    return JSON.stringify({
      fehler: null,
    });
  } else {
    console.log("Back");
    return JSON.stringify({
      fehler: a,
    });
  }
}

function setPreis(body) {
  console.log("Preis");
  let a = body.nettopreis.split(",");
  console.log(a);
  let d = Number(a[0] + "." + a[1]);
  console.log(d);
  return d;
}

module.exports = { createProdukt, changeProdukt, deleteProdukt };
