const path = require("path");
const express = require("express");
const isAuth = require("../middleware/controller");
const server = express();

//passwordAendern
server.get("/passwortAendern", isAuth, (req, res) => {
  res.sendFile("passwortAendern.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

module.exports = server;
