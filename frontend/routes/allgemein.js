const express = require("express");
const allgemein = require("../API_Access/Benutzer/allgemein");
const server = express();
const warenkorb = require("../API_Access/Bestellung/warenkorb");
const isAuth = require("../middleware/controller");

//ausstehendeBestellungen
server.get("/allgemein/", isAuth, (req, res) => {
  allgemeinGet(req, res);
});

server.get("/allgemein/warenkorb", isAuth, (req, res) => {
  getWarenkorb(req, res);
});

async function allgemeinGet(req, res) {
  const a = await allgemein.getAllgemein(req);
  res.send(a);
}

async function getWarenkorb(req, res) {
  const a = await warenkorb.getWarenkorById(body);
  return a;
}

module.exports = server;
