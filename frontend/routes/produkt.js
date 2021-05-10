const path = require("path");
const express = require("express");
const server = express();
const produkt = require("../API_Access/Sortiment/produkt");
const validator = require("../Module/Validator/validator");

//
server.get("/produkt", (req, res) => {
  res.sendFile("produkt.html", { root: path.join(__dirname, "..", "view") });
});

server.get("/produkt/api/:id", (req, res) => {
  const a = getProdukt(req, res);
});

async function getProdukt(req, res) {
  const id = req.params.id;
  const b = await produkt.getProduktById(1, id);
  res.send(b);
}

module.exports = server;
