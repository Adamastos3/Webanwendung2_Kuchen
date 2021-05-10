const path = require("path");
const express = require("express");
const server = express();
const produkt = require("../API_Access/Sortiment/produkt");

//warenkorb

server.get("/warenkorb", (req, res) => {
  res.sendFile("warenkorb.html", { root: path.join(__dirname, "..", "view") });
});

server.get("/warenkorb/api/reg", (req, res) => {
  getRegular(req, res);
});

server.get("/warenkorb/api/indi", (req, res) => {
  getIndi(req, res);
});

async function getRegular(req, res) {
  const a = await produkt.getAllProdukt(1);
  res.send(a);
}

async function getIndi(req, res) {
  const a = await produkt.getAllProdukt(2);
  res.send(a);
}

module.exports = server;
