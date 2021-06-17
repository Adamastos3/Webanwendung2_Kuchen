const fs = require("fs");
const path = require("path");
const express = require("express");
const server = express();

//impressum
server.get("/impressum", (req, res) => {
  res.sendFile("impressum.html", { root: path.join(__dirname, "..", "view") });
});

server.get("/impressum/agb", (req, res) => {
  let tempFile = path.join(__dirname, "../public/pdf", "Rechtstext_AGB.pdf");
  fs.readFile(tempFile, function (err, data) {
    res.contentType("application/pdf");
    res.send(data);
  });
});

module.exports = server;
