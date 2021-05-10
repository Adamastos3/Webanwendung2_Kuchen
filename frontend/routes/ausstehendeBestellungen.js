const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");
const bestellung = require("../API_Access/Bestellung/bestellung");

//ausstehendeBestellungen
server.get("/ausstehendeBestellungen", isAuth, (req, res) => {
  res.sendFile("ausstehendeBestellungen.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

server.get("/ausstehendeBestellungen/api", isAuth, (req, res) => {
  ausstehendeBestellungenGet(req, res);
});

server.post("/ausstehendeBestellungen", isAuth, (req, res) => {
  erledigtBestellung(req, res);
});

async function ausstehendeBestellungenGet(req, res) {
  const a = await bestellung.getAusstehendeBestellungen();
  console.log(a);
  res.send(a);
}

async function erledigtBestellung(req, res) {
  const a = await bestellung.bestellungErledigt(req.body);
  res.send(a);
}

module.exports = server;
