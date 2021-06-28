const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");
const bestellung = require("../API_Access/Bestellung/bestellung");

//bestellhistorie
server.get("/bestellhistorie", isAuth.isAuth, (req, res) => {
  res.sendFile("bestellhistorie.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

server.get("/bestellhistorie/api", isAuth.isAuth, (req, res) => {
  bestellhistorieGet(req, res);
});

async function bestellhistorieGet(req, res) {
  const a = await bestellung.getBestellungByUserId(req.session.username);
  res.send(a);
}

module.exports = server;
