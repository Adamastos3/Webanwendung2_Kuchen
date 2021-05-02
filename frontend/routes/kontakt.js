const path = require("path");
const express = require("express");
const server = express();

//kontakt
server.get("/kontakt", (req, res) => {
  res.sendFile("kontakt.html", { root: path.join(__dirname, "..", "view") });
});

server.post("/kontakt", (req, res) => {
  res.send.status(200);
});

module.exports = server;
