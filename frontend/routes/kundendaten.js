const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");
const kundendaten = require("../API_Access/IhreDaten/kundendaten");

//kundendaten
server.get("/kundendaten", isAuth.isAuthAdmin, (req, res) => {
  res.sendFile("kundendaten.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

server.get("/kundendaten/api", isAuth.isAuthAdmin, (req, res) => {
  getKunden(req, res);
});

server.delete("/kundendaten/:id", isAuth.isAuthAdmin, (req, res) => {
  deleteKunden(req, res);
});

async function getKunden(req, res) {
  const a = await kundendaten.getKunden();
  res.send(a);
}

async function deleteKunden(req, res) {
  const a = await kundendaten.deleteKunden(req);
  res.status(200).send();
}

module.exports = server;
