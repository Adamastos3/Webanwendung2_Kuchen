const path = require("path");
const express = require("express");
const server = express();
const produkt = require("../API_Access/Sortiment/produkt");
const produktAdmin = require("../API_Access/Sortiment/produktAdmin");
const isAuth = require("../middleware/controller");

//
server.get("/produkt", (req, res) => {
  res.sendFile("produkt.html", { root: path.join(__dirname, "..", "view") });
});

server.get("/produktdaten", (req, res) => {
  res.sendFile("produktdaten.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

server.get("/neuesProdukt", (req, res) => {
  res.sendFile("neuesProdukt.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

server.get("/produktAendern", (req, res) => {
  res.sendFile("changeProdukt.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

server.get("/produkt/api/alle", isAuth, (req, res) => {
  console.log("Alle");
  getProdukte(req, res);
});

server.get("/produkt/api/:id", (req, res) => {
  console.log("ID");
  const a = getProdukt(req, res);
});

server.post("/produkt", isAuth, (req, res) => {
  createProdukt(req, res);
});

server.put("/produkt", isAuth, (req, res) => {
  changeProdukt(req, res);
});

server.delete("/produkt/:id", isAuth, (req, res) => {
  deleteProdukt(req, res);
});

async function getProdukte(req, res) {
  const b = await produkt.getAllProdukt(1, 1);
  res.send(b);
}

async function getProdukt(req, res) {
  const id = req.params.id;
  const b = await produkt.getProduktById(1, id);
  res.send(b);
}

async function createProdukt(req, res) {
  console.log(req.body);
  const b = await produktAdmin.createProdukt(req.body);
  res.send(b);
}

async function changeProdukt(req, res) {
  console.log("Body");
  console.log(req.body);
  const b = await produktAdmin.changeProdukt(req.body);
  res.send(b);
}

async function deleteProdukt(req, res) {
  let id = req.params.id;
  console.log("Delete");
  console.log(id);
  const s = await produktAdmin.deleteProdukt(id);
  res.send(s);
}

module.exports = server;
