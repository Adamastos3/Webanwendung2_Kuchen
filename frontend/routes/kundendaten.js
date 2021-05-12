const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");
const kundendaten = require("../API_Access/IhreDaten/kundendaten");
const benutzer = require("../API_Access/Benutzer/benutzer");
const validator = require("../Module/Validator/validator");

//kundendaten
server.get("/kundendaten", isAuth, (req, res) => {
  res.sendFile("kundendaten.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

server.get("/kundendaten/api", isAuth, (req, res) => {
  getKunden(req, res);
});

server.delete("/kundendaten/:id", isAuth, (req, res) => {
  deleteKunden(req, res);
});

async function getKunden(req, res) {
  const a = await kundendaten.getKunden();
  res.send(a);
}

async function deleteKunden(req, res) {
  const a = validator.checkID(req.params.id);
  if (a.length < 1) {
    const b = benutzer.deleteBenutzer(req.params.id);
    console.log(b);
  }
}

module.exports = server;
