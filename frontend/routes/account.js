const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");

//account
server.get("/account", isAuth.isAuth, (req, res) => {
  res.sendFile("account.html", { root: path.join(__dirname, "..", "view") });
});

module.exports = server;
