const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");

//accountMitarbeiter
server.get("/accountMitarbeiter", isAuth, (req, res) => {
  res.sendFile("accountMitarbeiter.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

module.exports = server;
