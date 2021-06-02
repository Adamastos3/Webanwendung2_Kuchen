const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");
const ihreDaten = require("../API_Access/IhreDaten/ihreDaten");

//ihreDaten
server.get("/ihreDaten", isAuth, (req, res) => {
  res.sendFile("ihreDaten.html", { root: path.join(__dirname, "..", "view") });
});

server.get("/ihreDaten/api", isAuth, (req, res) => {
  getData(req, res);
});

server.post("/ihreDaten/api", isAuth, (req, res) => {
  checkData(req, res);
});

server.post("/ihreDaten/api/kundenchange", isAuth, (req, res) => {
  checkData(req, res, 1);
});

server.post("/ihreDaten", isAuth, (req, res) => {
  setData(req, res);
});

async function setData(req, res) {
  const b = await ihreDaten.setIhreDaten(req.body, req.session.username);
  res.send(b);
}

async function getData(req, res) {
  const a = await ihreDaten.getBenutzerDaten(req.session.username);
  res.send(a);
}

async function checkData(req, res, iden = undefined) {
  if (iden == undefined) {
    const data = await ihreDaten.checkBenutzer(req.body, req.session.username);
    res.send(data);
  } else {
    const data = await ihreDaten.checkBenutzer(
      req.body,
      req.session.username,
      "kunde"
    );
    res.send(data);
  }
}

module.exports = server;
