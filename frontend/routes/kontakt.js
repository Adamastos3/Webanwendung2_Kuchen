const path = require("path");
const express = require("express");
const server = express();
const kontakt = require("../API_Access/Kontakt/kontakt");

//kontakt
server.get("/kontakt", (req, res) => {
  res.sendFile("kontakt.html", { root: path.join(__dirname, "..", "view") });
});

server.post("/kontakt", (req, res) => {
  sendKontakt(req, res);
});

async function sendKontakt(req, res) {
  const a = kontakt.sendKontakt(req.body);
  res.send(a);
}

module.exports = server;
