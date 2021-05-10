const path = require("path");
const express = require("express");
const isAuth = require("../middleware/controller");
const server = express();
const passwort = require("../API_Access/IhreDaten/password");

//passwordAendern
server.get("/passwortAendern", isAuth, (req, res) => {
  res.sendFile("passwortAendern.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

server.post("/passwortAendern", isAuth, (req, res) => {
  setNewPassword(req, res);
});

async function setNewPassword(req, res) {
  const a = await passwort.setNewPassword(req.body, req.session.username);
  console.log("Änderung fertig");
  console.log(a);
  if (a.fehler == null) {
    req.session.authenticated = false;
  }
  res.send(a);
}

module.exports = server;
