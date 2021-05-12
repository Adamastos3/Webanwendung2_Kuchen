const path = require("path");
const express = require("express");
const server = express();
const login = require("../API_Access/Login/login");

//const session = require("express-session")

//login
server.get("/login", (req, res) => {
  res.sendFile("login.html", { root: path.join(__dirname, "..", "view") });
});

server.post("/login", (req, res) => {
  console.log("login");
  console.log(req.body);
  logins(req, res);
});

async function logins(req, res) {
  const a = await login.getLogin(req);
  res.send(a);
}

module.exports = server;
