const path = require("path");
const express = require("express");
const server = express();
const passwort = require("../API_Access/IhreDaten/password");

//passwordVergessen
server.get("/passwordVergessen", (req, res) => {
  res.sendFile("passwortVergessen.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

server.post("/passwordVergessen", (req, res) => {
  passV(req, res);
});

async function passV(req, res) {
  const a = await passwort.resetPassword(req.body);
  return a;
}
module.exports = server;
