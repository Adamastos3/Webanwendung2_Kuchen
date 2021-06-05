const request = require("../Request/request");
const validator = require("../../Module/Validator/validator");
const produkt = require("../Sortiment/produkt");
const benutzer = require("../Benutzer/benutzer");
const zahlung = require("../Zahlung/zahlung");
const mail = require("../../Module/Nodemailer/sendMail");

const pas = "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa";
const pathIndi = "http://localhost:8000/wba2api/individuelles/alle" + pas;
const pathBestellung = "http://localhost:8000/wba2api/bestellung" + pas;

async function createBestellung(body, id) {
  function toGerman(date) {
    let a = date.split("-");
    return a[2] + "." + a[1] + "." + a[0];
  }

  const a = await validator.checkKasse(body);

  if (a) {
    const benutzerDaten = await benutzer.getBenutzerbyId(id);

    const pro = await setBestellposition(body);

    if (benutzerDaten != null && pro.length > 0) {
      let datenBestellung = JSON.stringify({
        besteller: {
          id: benutzerDaten.daten.person.id,
        },
        zahlungsart: {
          id: await checkZahlungsart(body.bezahlung),
        },
        bestellpositionen: pro,
        lieferdatum: toGerman(body.lieferdatum),
      });
      const postBestellung = await request.postRequest(
        pathBestellung,
        datenBestellung
      );
      if (postBestellung != null) {
        //Mail muss aktiviert werden
        //const info = await mail.sendBestellbestaetigung(postBestellung);
        let result = {
          fehler: null,
          daten: {
            id: postBestellung.id,
            zeitpunkt: postBestellung.bestellzeitpunkt,
            lieferzeitpunkt: postBestellung.lieferzeitpunkt,
          },
        };
        return result;
      } else {
        let result = {
          fehler: true,
        };
        return result;
      }
    }
  }
}

async function checkZahlungsart(name) {
  const a = await zahlung.getZahlungAll();
  for (let i = 0; i < a.daten.length; i++) {
    let e = a.daten[i];
    if (e.bezeichnung == name) {
      return e.id;
    }
  }
}

async function setBestellposition(body) {
  let pro = [];
  const indiDaten = await request.getRequest(pathIndi);

  for (let i = 0; i < body.produkt.length; i++) {
    let elem = body.produkt[i];

    if (elem.bezeichnung == "regular") {
      let text = {
        produkt: {
          id: elem.id,
        },
        menge: elem.menge,
      };
      pro.push(text);
    }
    if (elem.bezeichnung == "individuel") {
      const i = getIndiDaten(elem, indiDaten);

      let daten = JSON.stringify({
        bezeichnung: "Individueller Kuchen",
        beschreibung: i[0],
        nettopreis: i[1],
        kategorie: {
          id: 2,
        },
        mehrwertsteuer: {
          id: 2,
        },
      });

      const prodIndi = await produkt.createProdukt(daten);

      let prodid = prodIndi.id;
      let text = {
        produkt: {
          id: prodid,
        },
        menge: elem.menge,
      };
      pro.push(text);
    }
  }
  return pro;
}

function getIndiDaten(elem, indiDaten) {
  let a = Number(elem.id.substring(0, 4));
  let b = Number(elem.id.substring(4, 8));
  let c = Number(elem.id.substring(8, 12));
  let d = Number(elem.id.substring(12, 16));

  let beschreibung = "";
  let preis = 0;

  try {
    for (let j = 0; j <= indiDaten.daten.length; j++) {
      if (j == indiDaten.daten.length) {
        let p = [];
        p.push(beschreibung);
        p.push(preis);
        return p;
      } else {
        let e = indiDaten.daten[j];
        if (e.id == a) {
          beschreibung += e.beschreibung + "\n";
          preis += e.nettopreis;
        }
        if (e.id == b) {
          beschreibung += e.beschreibung + "\n";
          preis += e.nettopreis;
        }
        if (e.id == c) {
          beschreibung += e.beschreibung + "\n";
          preis += e.nettopreis;
        }
        if (e.id == d) {
          beschreibung += e.beschreibung + "\n";
          preis += e.nettopreis;
        }
      }
    }
  } catch {
    console.log("Error");
  }
}

async function getBestellungByUserId(username) {
  const pathBes = "http://localhost:8000/wba2api/bestellung/alle";
  const pathB = "http://localhost:8000/wba2api/benutzer/gib/";
  let data = "";
  if (username == undefined) {
    return JSON.stringify({
      fehler: "Authorisierung needed",
      daten: null,
    });
  } else {
    const r = await request.getRequest(pathBes + pas);
    const be = await request.getRequest(pathB + username + pas);

    if (r.daten != null && be.daten != null) {
      let daten = [];
      for (let i = 0; i < r.daten.length; i++) {
        if (r.daten[i].besteller != null) {
          if (r.daten[i].besteller.id == be.daten.person.id) {
            daten.push(r.daten[i]);
          }
        }
      }

      if (daten.length > 0) {
        data = JSON.stringify({
          fehler: null,
          daten: r.daten,
        });
      } else {
        data = JSON.stringify({
          fehler: "NO Data",
          daten: null,
        });
      }

      return data;
    } else {
      return JSON.stringify({
        fehler: "NO Data",
        daten: null,
      });
    }
  }
}

async function getAusstehendeBestellungen() {
  const path = "http://localhost:8000/wba2api/bestellung/alle" + pas;
  const r = await request.getRequest(path);
  let res = [];
  if (r.daten != null) {
    for (let i = 0; i < r.daten.length; i++) {
      if (r.daten[i].status == 0) {
        res.push(r.daten[i]);
      }
    }

    let data = JSON.stringify({
      fehler: null,
      daten: res,
    });

    return data;
  } else {
    return JSON.stringify({
      fehler: "No data",
      daten: null,
    });
  }
}

async function bestellungErledigt(body) {
  const a = await validator.checkID(body.id);

  if (a.length < 1) {
    const path = "http://localhost:8000/wba2api/bestellung" + pas;
    const oldData = await getBestellungByID(body.id);

    let data = JSON.stringify({
      id: oldData.daten.id,
      besteller: {
        id: oldData.daten.besteller.id,
      },
      bestellzeitpunkt: oldData.daten.bestellzeitpunkt,
      zahlungsart: {
        id: oldData.daten.zahlungsart.id,
      },
      bestellpositionen: oldData.daten.bestellpositionen,
      lieferdatum: oldData.daten.lieferzeitpunkt,
    });

    const geaendert = await request.putRequest(path, data);

    if (geaendert != null) {
      return JSON.stringify({
        fehler: null,
      });
    } else {
      return JSON.stringify({
        fehler: [{ bezeichnung: "Server Error" }],
      });
    }
  }
  return JSON.stringify({
    fehler: a,
  });
}

async function getBestellungByID(id) {
  const pathID = "http://localhost:8000/wba2api/bestellung/gib/" + id + pas;
  const a = await request.getRequest(pathID);
  return a;
}

module.exports = {
  createBestellung,
  getBestellungByUserId,
  getAusstehendeBestellungen,
  getBestellungByID,
  bestellungErledigt,
};
