const path = require("path");
const express = require("express");
const allgemein = require("../API_Access/Benutzer/allgemein");
const server = express();

//ausstehendeBestellungen
server.get("/allgemein/", (req, res) => {
  allgemeinGet(req, res);
});

async function allgemeinGet(req, res) {
  const a = await allgemein.getAllgemein(req);
  res.send(a);
}

module.exports = server;
