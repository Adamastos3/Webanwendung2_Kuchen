const postRequest = require("../Request/postRequest");
const validator = require("../../Module/Validator/validator");
const getRequest = require("../Request/getRequest");
const putRequest = require("../Request/putRequest");
const produkt = require("../Sortiment/produkt");
const benutzer = require("../Benutzer/benutzer");
const zahlung = require("../Zahlung/zahlung");
const mail = require("../../Module/Nodemailer/mail");

const pas = "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa";
const pathIndi = "http://localhost:8000/wba2api/individuelles/alle" + pas;
const pathBestellung = "http://localhost:8000/wba2api/bestellung" + pas;

async function createBestellung(body, id) {
  console.log(body);
  const a = await validator.checkKasse(body);

  console.log("ergebnis");
  console.log(a);
  if (a) {
    const benutzerDaten = await benutzer.getBenutzerbyId(id);
    console.log(benutzerDaten);
    const pro = await setBestellposition(body);
    console.log(pro);

    if (benutzerDaten != null && pro.length > 0) {
      console.log("test daten");
      console.log(benutzerDaten);
      console.log(pro);
      let datenBestellung = JSON.stringify({
        besteller: {
          id: benutzerDaten.daten.person.id,
        },
        zahlungsart: {
          id: await checkZahlungsart(body.bezahlung),
        },
        bestellpositionen: pro,
      });
      console.log("daten bestellung");
      console.log(datenBestellung);
      const postBestellung = await postRequest(pathBestellung, datenBestellung);
      console.log("Bestellung fertig");
      console.log(postBestellung);
      if (postBestellung != null) {
        //Mail fehlt noch
        console.log("hat funktioniert");
        return true;
      } else {
        return false;
      }
    }
  }
}

//fehlt noch
function sendMail(person, bestellung) {}

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
  const indiDaten = await getRequest(pathIndi);
  console.log(indiDaten);
  for (let i = 0; i < body.produkt.length; i++) {
    let elem = body.produkt[i];
    console.log(elem);
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
      console.log("hallo");
      const i = getIndiDaten(elem, indiDaten);
      console.log(i);

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
      console.log("Daten für produkt");
      console.log(daten);

      const prodIndi = await produkt.createProdukt(daten);
      console.log("Produkt individuel");
      console.log(prodIndi);
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
    console.log(indiDaten.daten.length);
    for (let j = 0; j <= indiDaten.daten.length; j++) {
      console.log("Tetet");
      console.log(j);
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
  console.log(username);
  if (username == undefined) {
    return JSON.stringify({
      fehler: "Authorisierung needed",
      daten: null,
    });
  } else {
    const r = await getRequest(pathBes + pas);
    const be = await getRequest(pathB + username + pas);
    console.log(r);
    console.log(be);
    if (r.daten != null && be.daten != null) {
      let daten = [];
      for (let i = 0; i < r.daten.length; i++) {
        console.log(r.daten[i]);
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
  const r = await getRequest(path);
  let res = [];
  if (r.daten != null) {
    for (let i = 0; i < r.daten.length; i++) {
      if (r.daten[i].status == 0) {
        res.push(r.daten[i]);
      }
    }

    console.log(res);

    let data = JSON.stringify({
      fehler: null,
      daten: res,
    });

    console.log("data");
    console.log(data);
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
  console.log("validator");
  console.log(a);
  if (a.length < 1) {
    const path = "http://localhost:8000/wba2api/bestellung" + pas;
    const oldData = await getBestellungByID(body.id);
    console.log("oldData");
    console.log(oldData);
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
    });
    console.log(data);
    const geaendert = await putRequest(path, data);
    console.log(geaendert);
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
  const a = await getRequest(pathID);
  return a;
}

module.exports = {
  createBestellung,
  getBestellungByUserId,
  getAusstehendeBestellungen,
  getBestellungByID,
  bestellungErledigt,
};
