const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");

//kundenChange
server.get("/kundenChange", isAuth, (req, res) => {
  res.sendFile("kundenChange.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

module.exports = server;
