const path = require("path");
const express = require("express");
const server = express();
const produkt = require("../API_Access/Sortiment/produkt");

//sortimentI
server.get("/sortimentI", (req, res) => {
  res.sendFile("sortimentI.html", { root: path.join(__dirname, "..", "view") });
});

server.get("/sortimentI/api", (req, res) => {
  getProdukte(req, res);
});

server.get("/sortimentI/api/:id", (req, res) => {
  getProdukt(req, res);
});

async function getProdukte(req, res) {
  const b = await produkt.getAllProdukt(2);
  console.log(b);
  res.send(b);
}

async function getProdukt(req, res) {
  let id = req.params.id;
  console.log("id Sortiment i");
  console.log(id);
  const b = await produkt.getProduktById(2, id);
  res.send(b);
}

module.exports = server;
