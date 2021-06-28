const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");

//ihreDatenMitarbeiter
server.get("/ihreDatenMitarbeiter", isAuth.isAuthMitarbeiter, (req, res) => {
  res.sendFile("ihreDatenMitarbeiter.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

module.exports = server;
