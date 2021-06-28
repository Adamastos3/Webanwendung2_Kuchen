const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");
const zahlung = require("../API_Access/Zahlung/zahlung");
const benutzer = require("../API_Access/Benutzer/benutzer");
const person = require("../API_Access/Person/person");
const bestellung = require("../API_Access/Bestellung/bestellung");
const warenkorb = require("../API_Access/Bestellung/warenkorb");

//kasse

//Auth fehlt noch
server.get("/kasse", isAuth.isAuth, (req, res) => {
  res.sendFile("kasse.html", { root: path.join(__dirname, "..", "view") });
});

server.get("/kasse/api/zahlung", isAuth.isAuth, (req, res) => {
  getZahlung(req, res);
});

server.get("/kasse/api/benutzer", isAuth.isAuth, (req, res) => {
  getPerson(req, res);
});

server.post("/kasse", isAuth.isAuth, (req, res) => {
  createBestellung(req, res);
});

async function getZahlung(req, res) {
  const a = await zahlung.getZahlungAll();
  res.send(a);
}

async function getPerson(req, res) {
  let id = req.session.username;
  const a = await benutzer.getBenutzerbyId(id);
  const b = a.daten.person.id;
  const c = await person.getPersonbyId(b);
  res.send(c);
}

async function createBestellung(req, res) {
  let id = req.session.username;
  const a = await bestellung.createBestellung(req.body, id);
  if (a.fehler == null) {
    const c = await warenkorb.resetWarenkorb(id);
    let daten = JSON.stringify(a);
    res.send(daten);
  } else {
    let daten = JSON.stringify(a);
    res.send(daten);
  }
}

module.exports = server;
