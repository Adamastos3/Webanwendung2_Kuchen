const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");
const zahlung = require("../API_Access/Zahlung/zahlung");
const benutzer = require("../API_Access/Benutzer/benutzer");
const person = require("../API_Access/Person/person");
const bestellung = require("../API_Access/Bestellung/bestellung");

//kasse

//Auth fehlt noch
server.get("/kasse", isAuth, (req, res) => {
  res.sendFile("kasse.html", { root: path.join(__dirname, "..", "view") });
});

server.get("/kasse/api/zahlung", isAuth, (req, res) => {
  getZahlung(req, res);
});

server.get("/kasse/api/benutzer", isAuth, (req, res) => {
  getPerson(req, res);
});

server.post("/kasse", isAuth, (req, res) => {
  console.log("Teeeets");
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
  if (a) {
    let daten = JSON.stringify({
      fehler: false,
    });
    res.send(daten);
  } else {
    let daten = JSON.stringify({
      fehler: true,
    });
    res.send(daten);
  }
}

module.exports = server;
