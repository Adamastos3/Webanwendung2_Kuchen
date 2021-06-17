const path = require("path");
const express = require("express");
const server = express();
const produkt = require("../API_Access/Sortiment/produkt");

//sortimentR
server.get("/sortimentR", (req, res) => {
  res.sendFile("sortimentR.html", { root: path.join(__dirname, "..", "view") });
});

server.get("/sortimentR/api", (req, res) => {
  getProdukte(req, res);
});

server.get("/sortimentR/api/:id", (req, res) => {
  getProdukt(req, res);
});

async function getProdukte(req, res) {
  const b = await produkt.getAllProdukt(1, 1);
  res.send(b);
}

async function getProdukt(req, res) {
  let id = req.params.id;
  const b = await produkt.getProduktById(1, id);
  res.send(b);
}

module.exports = server;
