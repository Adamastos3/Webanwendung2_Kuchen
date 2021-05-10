const postRequest = require("../Request/postRequest");
const validator = require("../../Module/Validator/validator");
const getRequest = require("../Request/getRequest");
const produkt = require("../Sortiment/produkt");
const benutzer = require("../Benutzer/benutzer");
const zahlung = require("../Zahlung/zahlung");

const pas = "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa";
const pathIndi = "http://localhost:8000/wba2api/individual/alle" + pas;
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
        console.log("hat funktioniert");
        return true;
      } else {
        return false;
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
  const indiDaten = await getRequest(pathIndi);
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
      let a = Number(elem.id.substring(0, 4));
      let b = Number(elem.id.substring(4, 8));
      let c = Number(elem.id.substring(8, 12));
      let d = Number(elem.id.substring(12, 16));
      let beschreibung = "";
      let preis = 0;

      for (let j = 0; j < indiDaten.length; j++) {
        let e = indiDaten[j];
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

      let daten = JSON.stringify({
        bezeichnung: "Individueller Kuchen",
        beschreibung: beschreibung,
        nettopreis: preis,
        kategorie: {
          id: 2,
        },
        mehrwertsteuer: {
          id: 2,
        },
      });
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

module.exports = { createBestellung };
