const path = require("path");
const express = require("express");
const server = express();
const register = require("../API_Access/Register/register");

//registrieren
server.get("/registrieren", (req, res) => {
  res.sendFile("registrieren.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

server.post("/registrieren/api", (req, res) => {
  console.log("reg api");
  checkReg(req, res);
});

server.post("/registrieren", (req, res) => {
  console.log(req.body);
  regist(req, res);
});

async function regist(req, res) {
  const d = await register.register(req.body);
  res.send(d);
}

async function checkReg(req, res) {
  const data = await register.checkBenutzerMail(req.body);
  console.log(data);

  res.send(data);
}

module.exports = server;
