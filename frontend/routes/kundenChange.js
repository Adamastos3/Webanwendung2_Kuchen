const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");
const kunde = require("../API_Access/IhreDaten/kundendaten");

//kundenChange
server.get("/kundenChange", isAuth, (req, res) => {
  res.sendFile("kundenChange.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

server.get("/kundenChange/api/:id", isAuth, (req, res) => {
  getKunde(req, res);
});

server.post("/kundenChange", isAuth, (req, res) => {
  setKunde(req, res);
});

async function getKunde(req, res) {
  const a = await kunde.getKunde(req.params.id);
  res.send(a);
}

async function setKunde(req, res) {
  const a = await kunde.setKunde(req.body);
  console.log(a);
}

module.exports = server;
