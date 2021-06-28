const express = require("express");
const allgemein = require("../API_Access/Benutzer/allgemein");
const server = express();
const warenkorb = require("../API_Access/Bestellung/warenkorb");
const isAuth = require("../middleware/controller");

//ausstehendeBestellungen
server.get("/allgemein/", (req, res) => {
  allgemeinGet(req, res);
});

server.get("/allgemein/warenkorb/", isAuth.isAuth, (req, res) => {
  getWarenkorb(req, res);
});

async function allgemeinGet(req, res) {
  const a = await allgemein.getAllgemein(req);
  res.send(a);
}

async function getWarenkorb(req, res) {
  const a = await warenkorb.getWarenkorById(req.session.username);
  res.send(a);
}

module.exports = server;
