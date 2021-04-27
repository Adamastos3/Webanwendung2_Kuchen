const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");
const ihreDaten = require("../API_Access/IhreDaten/ihreDaten");

//ihreDaten
server.get("/ihreDaten", isAuth, (req, res) => {
  res.sendFile("ihreDaten.html", { root: path.join(__dirname, "..", "view") });
});

server.post("/ihreDaten", isAuth, (req, res) => {
  setData(req, res);
});

async function setData(req, res) {
  const b = await ihreDaten(req.body, req.session.username);
  if (b != undefined) {
    res.redirect("/ihreDaten");
  } else {
    res.status(404).redirect("/ihreDaten");
  }
}

module.exports = server;
